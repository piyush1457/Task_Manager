const config = {
    // MongoDB Connection String
    // I populated this with your User and Cluster. 
    // PLEASE REPLACE <PASSWORD> WITH YOUR ACTUAL PASSWORD.
    MONGODB_URI: "mongodb+srv://piyushsodhi145_db_user:7MvlKsFSLPqM9GLq@cluster0.bujpid1.mongodb.net/?appName=Cluster0",

    // NextAuth Secret
    NEXTAUTH_SECRET: "changeme_secret_random_string_12345",

    // Application URL
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
};

export default config;
