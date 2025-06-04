//Gerekli bağımlılıkları dahil ettim
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); //.env dosyasındaki değişkenleri process.env içine yükledim

const app = express(); // Express uygulamasını başlatır
app.use(cors()); // cors middleware tüm istemcilerden gelen istekleri kabul eder
app.use(express.json()); //Gelen isteklerdeki JSON verileri parse eder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //uploads yolunu statik olarak servis ettim

// Route dosyalarını uygulamaya tanımladım. Bunlar sayesinde gelen api istekleri ilgili route ve controller'a yönlendirilir
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/revisions', require('./routes/revisionRoutes')); 
app.use('/api/remarks', require('./routes/remarkRoutes'));

//Port ve Mongo URI değerlerini .env üzerinden alır
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//Mongodb bağlantısı kurulan yer
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB bağlantısı başarılı');
  app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
})
.catch(err => console.log(' MongoDB bağlantı hatası:', err));
