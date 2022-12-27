migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4wgs1bp20wdv9fj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lmp7batw",
    "name": "bike",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "uwaj77bg14h35pc",
      "cascadeDelete": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2hzbevom",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jg206hdq",
    "name": "trajet",
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
  const collection = dao.findCollectionByNameOrId("4wgs1bp20wdv9fj")

  // remove
  collection.schema.removeField("lmp7batw")

  // remove
  collection.schema.removeField("2hzbevom")

  // remove
  collection.schema.removeField("jg206hdq")

  return dao.saveCollection(collection)
})
