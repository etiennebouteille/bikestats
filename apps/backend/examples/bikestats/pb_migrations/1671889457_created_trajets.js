migrate((db) => {
  const collection = new Collection({
    "id": "8h4gu90vmuydtlc",
    "created": "2022-12-24 13:44:17.648Z",
    "updated": "2022-12-24 13:44:17.648Z",
    "name": "trajets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0gxfxr9e",
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
        "id": "zk0hfnqj",
        "name": "distance",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "axwbppye",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
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
  const collection = dao.findCollectionByNameOrId("8h4gu90vmuydtlc");

  return dao.deleteCollection(collection);
})
