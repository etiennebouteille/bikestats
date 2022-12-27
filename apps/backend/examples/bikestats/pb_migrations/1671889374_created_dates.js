migrate((db) => {
  const collection = new Collection({
    "id": "4wgs1bp20wdv9fj",
    "created": "2022-12-24 13:42:54.493Z",
    "updated": "2022-12-24 13:42:54.493Z",
    "name": "dates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "izw4edz9",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4wgs1bp20wdv9fj");

  return dao.deleteCollection(collection);
})
