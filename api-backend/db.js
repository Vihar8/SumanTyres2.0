// const mongoose = require('mongoose');
// require('dotenv').config();
//     //  const mongoURL = 'mongodb://localhost:27017/sumantyres';
//     const mongoURL = process.env.MONGODB_URL;

// //setup mongodb connection
// mongoose.connect(mongoURL, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// });

// const db = mongoose.connection;

// db.on('connected', () => {
//     console.log('Connected to MongoDB'); 
// });

// db.on('error', (err) => {
//     console.log('MongoDB connection error');  
// });

// db.on('disconnected', () => {
//     console.log('MongoDB disconnected');
// }); 

const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL;

// Retry logic in case Render restarts before Atlas is ready
const connectWithRetry = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // ✅ Atlas TLS options
      ssl: true,
      tls: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("⏳ Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Event listeners
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("⚠️ MongoDB error:", err.message);
});

db.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Retrying...");
  connectWithRetry();
});

module.exports = db;
