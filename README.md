MMS Task 2 – Document Tracking System

Bu proje, teknik dökümanların revizyonlarını ve yorumlarını yönetebileceğiniz bir belge takip sistemidir.  
Kullanıcılar döküman ekleyebilir, versiyon oluşturabilir, her revizyon için rol bazlı not bırakabilir ve belgeleri organize bir şekilde takip edebilir.

---

Kurulum

1. Backend Kurulumu

```bash
cd case-backend
npm install
```

`.env` dosyasını oluşturun ve şu şekilde doldurun:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mms
```

Ardından çalıştırmak için:

```bash
npm start
```

---

2. Frontend Kurulumu

```bash
cd mms-frontend
npm install
npm run dev
```

> Uygulama [http://localhost:5173](http://localhost:5173) adresinde çalışır.

---

Proje Yapısı

```
case-backend/
├── controllers/          # document, revision, remark controller
├── models/               # Mongoose modelleri (Document, Revision, Remark)
├── routes/               # Express route dosyaları
├── uploads/              # Yüklenen dosyalar
└── server.js             # Ana backend giriş dosyası

mms-frontend/
├── src/
│   ├── pages/            # NewDocument, AddRevision, RemarkPage vs.
│   ├── services/         # Axios API servisi
│   └── App.jsx, main.jsx
```

---

API Endpointleri

| Endpoint                         | Yöntem | Açıklama                             |
|----------------------------------|--------|--------------------------------------|
| `/documents`                    | POST   | Yeni döküman oluştur                 |
| `/documents`                    | GET    | Tüm dökümanları listele              |
| `/documents/:id`                | GET    | Döküman detayları ve revizyonlar     |
| `/revisions/:id/revision`       | POST   | Yeni revizyon dosyası yükle          |
| `/remarks`                      | POST   | Yeni not ekle                        |
| `/remarks/:revisionId`          | GET    | Belirli revizyona ait tüm notları getir |

---

Veri İlişkisi Şeması

```
Document
  └── Revision (1 - N)
        └── Remark (1 - N) 
              ↳ role: Owner / Design / Class / Flag
```

---

Özellikler

- Döküman ekleme, listeleme, detay görüntüleme
- Revizyon yükleme 
- Her revizyona rol bazlı not bırakma 
- Dosya yüklemede drag-and-drop desteği
- Gelişmiş listeleme için MUI DataGrid kullanımı
- Form doğrulama:Formik + Yup
- Material UI ile responsive ve kullanıcı dostu arayüz
- Axios ile API bağlantısı


