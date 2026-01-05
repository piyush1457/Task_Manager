const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

console.log('1. Starting Verify Script...');

if (!uri) {
    console.error('❌ MONGODB_URI is undefined. Check .env.local file formatting.');
    process.exit(1);
}

console.log('2. URI detected (length: ' + uri.length + ')');

// Check for common formatting errors
if (uri.includes(' ')) {
    console.error('❌ URI contains spaces. Remove them.');
    process.exit(1);
}

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        console.log('3. Attempting Mongoose Connect...');
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
        process.exit(0);
    } catch (err) {
        console.error('❌ Error Type:', err.name);
        console.error('❌ Error Code:', err.code);
        console.error('❌ Error CodeName:', err.codeName);
        console.error('❌ Full Error:', err.message);

        if (err.code === 8000) {
            console.log('\n--- SOLUTION ---');
            console.log('Your Username/Password are correct, but the SERVER rejected the connection.');
            console.log('Use this link to whitelist your IP:');
            console.log('https://cloud.mongodb.com/v2/ -> Security -> Network Access -> Add IP Address -> Allow Access From Anywhere');
        }
    } finally {
        await mongoose.disconnect();
    }
}
run().catch(console.dir);
