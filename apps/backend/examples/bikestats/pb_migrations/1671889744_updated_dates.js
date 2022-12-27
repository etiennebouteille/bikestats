migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4wgs1bp20wdv9fj")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4wgs1bp20wdv9fj")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
