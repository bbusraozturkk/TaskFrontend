Zorluklar ve Kararlar:

Uygulamanın doküman yönetimi tarafında, özellikle revizyonların dosya olarak yüklenip sonradan indirilmesi kısmında tarayıcı seviyesinde dosya yolu erişimi, path encoding gibi sorunlarla karşılaştım. Bu problemi çözmek için Express res.download fonksiyonu yerine express.static çözümünü uyguladım ve frontend'de dosya bağlantısını yeniden yapılandırdım. Ancak Başarılı bir sonuca ulaşamadığım için dosyayı indirmek yerine görüntüleme yaptım.

Notlar (remarks) özelliğinde, kullanıcı rolleri bazlı ayrı ayrı sekmeler oluşturulması isteniyordu. Burada Tabs yapısı ve dinamik Formik formunun aktif role göre filtrelenmesi teknik olarak özen gerektiren bir yapıya dönüştü. Bu süreci role bazlı gruplayarak ve activeTab state yönetimiyle başarılı şekilde çözdüm.

Alınan Teknik Kararlar:

Formlarda Formik + Yup kombinasyonunu tercih ettim. Bu karar sayesinde hem kullanıcı deneyimi hem de hata kontrolü açısından tutarlı ve yönetilebilir bir yapı kurdum.

Dosya yükleme işlemi için drag-and-drop destekli özel bir alan oluşturulması istendi. Bu nedenle, onDrop, onDragOver, onDragLeave event’lerini manuel yönettim. Bu, Material UI ile tam entegre olmayan ama esnek bir alan sunmamı sağladı.

Backend tarafında multer kütüphanesi ile dosya işlemlerini yönettim. Dosya yolu saklama ve servis etme işlemlerinde path modülünü dikkatli bir şekilde kullandım.

Third-party ve UI Kütüphaneleri:

Material-UI (MUI): Case görsel tutarlılık, bileşen yönetimi ve responsive tasarım beklentilerini karşıladığı için kullanıldı.

Formik & Yup: Form yönetimi ve validasyonları kolaylaştırmak için tercih edildi.

Recharts: Durum grafiği için sade ama işlevsel bir görselleştirme sunmak adına kullanıldı.

Genel Yaklaşım:

Geliştirme sürecinde önce backend API’lerini tamamladım, ardından tüm işlemleri frontend'e entegre ettim. Özellikle her sayfa için UI + logic + data management mantığını ayrı ayrı ele alarak ilerledim.

Gereksiz kod tekrarı olmaması adına ortak component yapısı kurmaya çalıştım ve kod okunabilirliğine özen gösterdim.