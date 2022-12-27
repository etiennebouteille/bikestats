migrate((db) => {
  const collection = new Collection({
    "id": "uwaj77bg14h35pc",
    "created": "2022-12-24 13:43:26.936Z",
    "updated": "2022-12-24 13:43:26.936Z",
    "name": "bikes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cefnftxm",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "5gu2slvy",
        "name": "serial",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("uwaj77bg14h35pc");

  return dao.deleteCollection(collection);
})
