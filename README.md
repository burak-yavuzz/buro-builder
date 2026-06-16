# 🚀 Premium Vue 3 Page Builder

Bu proje, ASP.NET Core veya herhangi bir modern backend ile entegre olabilen, DOM işlemlerini tarihe gömen, tamamen Şema Tabanlı (Schema-Driven) çalışan birinci sınıf bir Vue 3 Site Oluşturucu (Page Builder) motorudur.

## 📁 Klasör Mantığı ve Görev Dağılımı

### `src/main.js`
* **Ne İşe Yarar?** Projenin kalbidir. Bootstrap'i, Bootstrap Icons'ı ve Vue'nun state yönetim sistemi olan **Pinia**'yı ayağa kaldırır.

### `src/store/builderStore.js` (State Manager)
* **Ne İşe Yarar?** Kullanıcının sayfada yaptığı tüm tasarımlar (Sürükleme, metin değiştirme) burada **JSON formatında** tutulur. `pageData` dizisi canvas'ı oluşturur. 
* **Önemi:** Kaydet butonuna bastığında API'ye (ASP.NET Core vb.) göndereceğin JSON datası buradan (`exportJSON` fonksiyonu ile) çıkar.

### `src/config/schemas.js` (Engine Rules)
* **Ne İşe Yarar?** Sistemde hangi bileşenlerin olduğunu, onların hangi ayarları (`props`) olduğunu ve sağ menüde hangi form elemanlarıyla yönetileceğini tanımlar.
* **Nasıl Kullanılır?** Sisteme yeni bir şey (örneğin Video elementi) eklersen, sadece buraya objesini yazarsın. Sağ paneldeki formlar **otomatik** oluşturulur!

### `src/App.vue` (Layout)
* **Ne İşe Yarar?** Ekranı üçe böler. Sol (Sidebar), Orta (Canvas) ve Sağ (PropertyEditor).

### `src/components/Sidebar.vue` (Draggable Palette)
* **Ne İşe Yarar?** `schemas.js` dosyasını okuyup sürüklenebilir butonları listeler. `vuedraggable` kütüphanesi kullanır.

### `src/components/CanvasArea.vue` ve `CanvasNode.vue`
* **Ne İşe Yarar?** Sürüklenen elemanların görsel olarak ekrana basıldığı yerdir. `CanvasNode.vue`, JSON'daki `type` değerini okur ve `src/elements/` klasöründeki gerçek Vue dosyalarını dinamik olarak yükler (`<component :is="...">`). Ayrıca seçme (mavi kenarlık) ve silme özelliklerini elemanlara kazandırır.

### `src/components/PropertyEditor.vue` (Smart Settings Panel)
* **Ne İşe Yarar?** Tıklanan elemanın ID'sini alır, şemasını `schemas.js`'den okur ve kullanıcıya renk, boşluk, text değiştirebileceği form alanları sunar. Değişiklikler anında `v-model` ile JSON'a yansır ve ekran çizilir.

### `src/elements/*.vue` (Gerçek Bileşenler)
* **Ne İşe Yarar?** Sistemin piyonlarıdır. Başlık, Buton, Resim gibi. Kendilerine verilen `props` objesini alıp Bootstrap class'ları olarak HTML'e basarlar. İçlerinde hiçbir iş mantığı (business logic) yoktur, sadece veriyi çizerler.

---

## 🛠 Projeyi Başlatmak

1. `npm install` (Gerekli paketleri kur)
2. `npm run dev` (Geliştirici modunda projeyi başlat)
3. `npm run build` (Sunucuya atmak için projeyi derle)