package main

import (
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// ---------------------------------------------------------------
	// Optional plugin flags:
	// ---------------------------------------------------------------

	var migrationsDir string
	app.RootCmd.PersistentFlags().StringVar(
		&migrationsDir,
		"migrationsDir",
		"",
		"the directory with the user defined migrations",
	)

	var automigrate bool
	app.RootCmd.PersistentFlags().BoolVar(
		&automigrate,
		"automigrate",
		true,
		"enable/disable auto migrations",
	)

	var publicDir string
	app.RootCmd.PersistentFlags().StringVar(
		&publicDir,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)

	var indexFallback bool
	app.RootCmd.PersistentFlags().BoolVar(
		&indexFallback,
		"indexFallback",
		true,
		"fallback the request to index.html on missing static path (eg. when pretty urls are used with SPA)",
	)

	app.RootCmd.ParseFlags(os.Args[1:])

	// ---------------------------------------------------------------
	// Plugins and hooks:
	// ---------------------------------------------------------------

	// load js pb_migrations
	jsvm.MustRegisterMigrations(app, &jsvm.MigrationsOptions{
		Dir: migrationsDir,
	})

	// migrate command (with js templates)
	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		TemplateLang: migratecmd.TemplateLangJS,
		Automigrate:  automigrate,
		Dir:          migrationsDir,
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDir), indexFallback))
		return nil
	})

	//triggered before a record is added to a collection
	app.OnModelBeforeCreate().Add(func(e *core.ModelEvent) error {

		//check if the newly added record is in table "users"
		if e.Model.TableName() == "users" {
			//get "trajets" collection
			collection, trajErr := app.Dao().FindCollectionByNameOrId("trajets")

			if trajErr != nil {
				log.Println("failed : ")
				return trajErr
			}

			//create a new record with default trajet values
			record := models.NewRecord(collection)
			record.Set("name", "Mon trajet")
			record.Set("distance", 10)
			record.Set("user", e.Model.GetId())

			//save new record to the collection
			if trajErr := app.Dao().SaveRecord(record); trajErr != nil {
				log.Println("error saving record")
				return trajErr
			}
		}

		return nil
	})

	//trigered after a record is added to a collection
	app.OnModelAfterCreate().Add(func(e *core.ModelEvent) error {

		//check if a new user was just created
		if e.Model.TableName() == "users" {

			//find the default trajet that was created for this user
			traj, trajErr := app.Dao().FindFirstRecordByData("trajets", "user", e.Model.GetId())

			if trajErr != nil {
				log.Println("failed : ")
				return trajErr
			}

			//get the record of the user that was just created
			user, userErr := app.Dao().FindRecordById("users", e.Model.GetId())

			if userErr != nil {
				log.Println("failed : ")
				return userErr
			}

			//add trajet id to the matching column in the user table
			user.Set("default_trajet", traj.GetId())

			//save user table with new data
			if trajErr := app.Dao().SaveRecord(user); trajErr != nil {
				log.Println("error saving record")
				return trajErr
			}
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// the default pb_public dir location is relative to the executable
func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		// most likely ran with go run
		return "./pb_public"
	}
	return filepath.Join(os.Args[0], "../pb_public")
}
