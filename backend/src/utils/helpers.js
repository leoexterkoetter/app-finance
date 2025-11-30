function formatMongoDoc(doc) {
  return {
    ...doc,
    id: doc._id.toString()
  };
}

function formatMongoDocs(docs) {
  return docs.map(formatMongoDoc);
}

module.exports = { formatMongoDoc, formatMongoDocs };
