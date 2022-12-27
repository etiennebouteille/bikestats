migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fofzpfwr",
    "name": "default_trajet",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "8h4gu90vmuydtlc",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("fofzpfwr")

  return dao.saveCollection(collection)
})
