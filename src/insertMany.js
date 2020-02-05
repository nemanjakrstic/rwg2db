const BATCH_SIZE = 10000;

const insertMany = async (db, collection, data) => {
    await db.dropCollection(collection).catch(() => {});

    let offset = 0;
    let documents = data.slice(offset, offset + BATCH_SIZE);

    while (documents.length > 0) {
        await db.collection(collection).insertMany(documents);
        offset += BATCH_SIZE;
        documents = data.slice(offset, offset + BATCH_SIZE);
    }
};

module.exports = insertMany;
