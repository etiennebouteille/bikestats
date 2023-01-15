# Flytta
Flytta est une application *minimaliste* pour suivre ses trajets **vélotaf**, dans le cadre notamment du forfait mobilité durable. Flytta est une application web basée sur **PocketBase** et **SvelteKit**

L'application peut être utilisée directement en créant un compte sur [flytta.etiennebouteille.com](https://flytta.etiennebouteille.com/)

### Features
- Cocher les jours effectués à vélo
- Calcul du pourcentage mensuel de trajets effectués à vélo
- Distance total parcourue
- CO2 économisé par rapport à un trajet en voiture
- Prise en compte des jours sans déplacement (congés, télétravail...)
- Sauvegarde de multiple trajets
- Optimisé pour l’installation sur téléphone (PWA)

## Utilisations
### En developement
La base de donnée et l'API back-end est une application [PocketBase](https://github.com/pocketbase/pocketbase) légèrement customisée
Pour la démarrer : 
```sh
go run apps/backend/builds/bikestats/main.go
```
On peut alors accéder à l'interface sur `http://0.0.0.0:8090/api/`


Le front-end est une application SvelteKit
```
cd apps/frontend
npm run dev
```

On peut alors accéder à l'application sur `https://localhost:5173`

### En production
L'application peut être déployée sur votre serveur dans un container Docker
```
cd apps/backend
docker compose up
```

Pour le frontend, il peut être déployé gratuitement sur [Netlify](https://www.netlify.com/). Pour cela vous devrez fork le projet sur Github, puis créer un nouveau site Netlify et importer votre repo. Enfin, définir le `base directory` dans les réglages sur `apps/frontend`

Pour que le site puisse se build correctement, il est également nécessaire de définir une variable d’environnement `AWS_LAMBDA_JS_RUNTIME` à `nodejs18.x`




