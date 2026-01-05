require('dotenv').config({ path: '.env.local' });
console.log('---START_URI---');
console.log(process.env.MONGODB_URI);
console.log('---END_URI---');
console.log('---START_SECRET---');
console.log(process.env.NEXTAUTH_SECRET);
console.log('---END_SECRET---');
