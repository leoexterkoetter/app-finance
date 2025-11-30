const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 
  'mongodb://mongo:nHvWVyeStJDGBRGkJRpyFIhuKKhwBHoQ@shinkansen.proxy.rlwy.net:48390';
const DB_NAME = process.env.DB_NAME || 'test';

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME
    });
    console.log('✅ Conectado ao MongoDB via Mongoose');
    console.log(`📊 Database: ${DB_NAME}`);
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
