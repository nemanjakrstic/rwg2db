const insertMany = require('./insertMany');
const mongodb = require('mongodb');
const config = require('config');
const path = require('path');

const feed = require(path.relative(__dirname, process.argv[2]));

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongodb.connect(config.get('mongodb.url'), options).then(async client => {
    const db = client.db('rwg_feeds');

    if (feed.availability) {
        await insertMany(db, 'availability', feed.service_availability[0].availability);
    } else if (feed.merchant) {
        await insertMany(db, 'merchants', feed.merchant);
    } else if (feed.service) {
        await insertMany(db, 'services', feed.service);
    }

    await client.close();
});
