## Document Modeli

Her dökümanın temel meta bilgilerini içerir. Her `Document`, bir veya daha fazla `Revision` ile ilişkilidir.

```js
{
  projectCode: String,       // Proje kodu (ör. NB001)
  type: String,              // Döküman tipi (ör. Hesap, Diagram, Elektrik)
  documentNo: String,        // Döküman numarası
  title: String,             // Döküman başlığı
  contractDate: Date,        // Kontrat tarihi
  currentRevision: Number,   // En güncel revizyon numarası (varsayılan: 1)
  approvalStatus: String,    // Onay durumu (ör. Onaylandı, Onay Bekliyor)
  description: String,       // Açıklama / açıklayıcı not
  createdBy: String,         // Dökümanı ekleyen kişi
  createdAt: Date,           // Oluşturulma tarihi (otomatik)
  updatedAt: Date            // Güncellenme tarihi (otomatik)
}

## Revision Modeli

Her dökümanın zaman içinde güncellenmiş versiyonlarını ifade eder.  
Bir `Document`, birden fazla `Revision` ile ilişkilidir.

```js
{
  documentId: ObjectId,     // Referans: Hangi dökümana ait olduğunu belirtir (ref: 'Document')
  revisionNo: Number,       // Revizyon numarası (manüel veya otomatik artırılır)
  filePath: String,         // Yüklenen dosyanın dosya sistemi üzerindeki yolu (ör: /uploads/abc.pdf)
  uploadedBy: String,       // Revizyonu yükleyen kişinin adı
  uploadedAt: Date,         // Yükleme tarihi (varsayılan: şimdi)
  notes: String             // Revizyona dair açıklama/metin
}

## Remark Modeli

Her revizyona kullanıcılar tarafından eklenen yorumları temsil eder.  
Yorumlar role özel alanlarda gruplanır (sekme yapısı gibi).

```js
{
  revisionId: ObjectId,     // Referans: Hangi revizyona ait olduğunu belirtir (ref: 'Revision')
  role: String,             // Yorumu yapan rol: 'Owner', 'Design', 'Class', 'Flag'
  text: String,             // Yorum içeriği (metin)
  createdBy: String,        // Yorumu yazan kullanıcı
  createdAt: Date           // Oluşturulma tarihi (varsayılan: şimdi)
}