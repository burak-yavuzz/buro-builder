const universalProps = {
    padding: { type: 'select', label: 'İç Boşluk', group: 'style', options: ['', 'p-2', 'p-3', 'p-4', 'p-5', 'py-5'], default: '' },
    margin: { type: 'select', label: 'Dış Boşluk', group: 'style', options: ['', 'm-0', 'mb-2', 'mb-3', 'mb-4', 'mb-5'], default: 'mb-3' },
    shadow: { type: 'select', label: 'Gölge', group: 'style', options: ['', 'shadow-sm', 'shadow', 'shadow-lg'], default: '' },
    bgColor: { type: 'color', label: 'Arka Plan Rengi', group: 'style', default: '#ffffff' },
    borderRadius: { type: 'select', label: 'Köşe Yuvarlama', group: 'style', options: ['0px', '4px', '8px', '15px', '50px', '50%'], default: '0px' },

    fontFamily: { type: 'select', label: 'Yazı Tipi', group: 'style', options: ['', '"Roboto", sans-serif', '"Montserrat", sans-serif', '"Open Sans", sans-serif', '"Playfair Display", serif'], default: '' },
    fontSize: { type: 'text', label: 'Font Boyutu (Örn: 18px, 1.5rem)', group: 'style', default: '' },
    fontWeight: { type: 'select', label: 'Yazı Kalınlığı', group: 'style', options: ['', '300 (İnce)', '400 (Normal)', '500 (Orta)', '600 (Yarı Kalın)', '700 (Kalın)', '900 (Ekstra Kalın)'], default: '' },
    customTextColor: { type: 'color', label: 'Özel Metin Rengi', group: 'style', default: '#000000' },

    animation: {
        type: 'select',
        label: 'Giriş Animasyonu',
        group: 'advanced',
        options: ['', 'animate__fadeIn', 'animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeInLeft', 'animate__fadeInRight', 'animate__fadeInTopLeft', 'animate__fadeInTopRight', 'animate__fadeInBottomLeft', 'animate__fadeInBottomRight', 'animate__zoomIn', 'animate__zoomInUp', 'animate__zoomInDown', 'animate__zoomInLeft', 'animate__zoomInRight', 'animate__slideInUp', 'animate__slideInDown', 'animate__slideInLeft', 'animate__slideInRight', 'animate__backInUp', 'animate__backInDown', 'animate__backInLeft', 'animate__backInRight', 'animate__bounceIn', 'animate__bounceInUp', 'animate__bounceInDown', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__rotateIn', 'animate__rotateInDownLeft', 'animate__rotateInDownRight', 'animate__rotateInUpLeft', 'animate__rotateInUpRight', 'animate__flipInX', 'animate__flipInY', 'animate__lightSpeedInLeft', 'animate__lightSpeedInRight', 'animate__jackInTheBox', 'animate__rollIn'],
        default: ''
    },
    customClass: { type: 'text', label: 'Özel CSS Sınıfı', group: 'advanced', default: '' }
};

export const componentSchemas = {
    row: {
        name: 'Satır (Row)', category: 'Layout', icon: 'fa-solid fa-grip-lines', isContainer: true,
        props: {
            align: { type: 'select', label: 'Dikey Hizalama', group: 'style', options: ['', 'align-items-start', 'align-items-center'], default: 'align-items-center' },
            ...universalProps
        }
    },
    col: {
        name: 'Sütun (Col)', category: 'Layout', icon: 'fa-solid fa-table-columns', isContainer: true,
        props: {
            size: { type: 'select', label: 'Genişlik (PC)', group: 'style', options: ['col-md-12', 'col-md-8', 'col-md-6', 'col-md-4', 'col-md-3'], default: 'col-md-6' },
            ...universalProps
        }
    },
    emptyspace: {
        name: 'Boşluk (Spacer)', category: 'Layout', icon: 'fa-solid fa-up-down',
        props: {
            height: { type: 'text', label: 'Yükseklik (Örn: 50px, 10vh)', group: 'style', default: '50px' },
            ...universalProps
        }
    },
    divider: {
        name: 'Ayırıcı Çizgi', category: 'Layout', icon: 'fa-solid fa-ruler-horizontal',
        props: {
            thickness: { type: 'select', label: 'Kalınlık', group: 'style', options: ['1px', '2px', '4px'], default: '1px' },
            color: { type: 'select', label: 'Renk', group: 'style', options: ['border-secondary', 'border-primary', 'border-dark', 'border-light'], default: 'border-secondary' },
            ...universalProps
        }
    },
    heading: {
        name: 'Başlık', category: 'Temel', icon: 'fa-solid fa-heading',
        props: {
            text: { type: 'text', label: 'Metin', group: 'content', default: 'Premium Başlık' },
            tag: { type: 'select', label: 'Etiket', group: 'content', options: ['h1', 'h2', 'h3', 'h4', 'h5'], default: 'h2' },
            color: { type: 'select', label: 'Renk', group: 'style', options: ['text-dark', 'text-primary', 'text-secondary', 'text-white'], default: 'text-dark' },
            align: { type: 'select', label: 'Hizalama', group: 'style', options: ['text-start', 'text-center', 'text-end'], default: 'text-start' },
            ...universalProps
        }
    },
    text: {
        name: 'Metin Editörü', category: 'Temel', icon: 'fa-solid fa-paragraph',
        props: {
            content: { type: 'textarea', label: 'İçerik', group: 'content', default: 'Modern web projeleri için zengin metin alanı.' },
            lead: { type: 'select', label: 'Vurgu', group: 'style', options: ['', 'lead'], default: '' },
            color: { type: 'select', label: 'Renk', group: 'style', options: ['text-dark', 'text-muted', 'text-white'], default: 'text-muted' },
            align: { type: 'select', label: 'Hizalama', group: 'style', options: ['text-start', 'text-center', 'text-end'], default: 'text-start' },
            ...universalProps
        }
    },
    button: {
        name: 'Aksiyon Butonu', category: 'Temel', icon: 'fa-solid fa-hand-pointer',
        props: {
            text: { type: 'text', label: 'Buton Metni', group: 'content', default: 'Tıkla' },
            link: { type: 'text', label: 'Yönlendirme URL', group: 'content', default: '#' },
            target: { type: 'select', label: 'Sekme Açılışı', group: 'content', options: ['_self', '_blank'], default: '_self' },
            variant: { type: 'select', label: 'Stil', group: 'style', options: ['btn-primary', 'btn-dark', 'btn-outline-primary', 'btn-light'], default: 'btn-primary' },
            size: { type: 'select', label: 'Boyut', group: 'style', options: ['btn-sm', '', 'btn-lg'], default: 'btn-lg' },
            ...universalProps
        }
    },
    image: {
        name: 'Görsel', category: 'Medya', icon: 'fa-solid fa-image',
        props: {
            src: { type: 'text', label: 'Görsel URL', group: 'content', default: 'https://placehold.co/800x400' },
            alt: { type: 'text', label: 'Alt Metin', group: 'content', default: 'Görsel' },
            ...universalProps
        }
    },
    slider: {
        name: 'Hero Slider', category: 'Medya', icon: 'fa-solid fa-images',
        props: {
            height: { type: 'select', label: 'Yükseklik', group: 'style', options: ['400px', '600px', '100vh'], default: '600px' },
            overlay: { type: 'select', label: 'Karanlık Filtre', group: 'style', options: ['0', '0.4', '0.7'], default: '0.4' },
            slides: {
                type: 'repeater',
                label: 'Slayt Listesi',
                group: 'content',
                subFields: {
                    img: { type: 'text', label: 'Görsel URL', default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
                    title: { type: 'text', label: '1. Kelime (Normal)', default: 'Dijital' },
                    titleColor: { type: 'color', label: '1. Kelime Rengi', default: '#ffffff' },
                    highlight: { type: 'text', label: '2. Kelime (Vurgulu)', default: 'Vizyon' },
                    highlightColor: { type: 'color', label: '2. Kelime Rengi', default: '#0d6efd' },
                    desc: { type: 'textarea', label: 'Açıklama', default: 'Modern tasarımlar ve güçlü altyapı.' },
                    descColor: { type: 'color', label: 'Açıklama Rengi', default: '#e9ecef' },
                    btnText: { type: 'text', label: 'Buton Metni', default: 'Keşfet' },
                    btnLink: { type: 'text', label: 'Buton Linki', default: '#' }
                },
                default: [
                    {
                        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
                        title: 'Dijital', titleColor: '#ffffff',
                        highlight: 'Vizyon', highlightColor: '#0d6efd',
                        desc: 'Modern tasarımlar ve güçlü altyapı.', descColor: '#e9ecef',
                        btnText: 'Hemen Başla', btnLink: '#'
                    }
                ]
            },
            ...universalProps
        }
    },
    video: {
        name: 'Video', category: 'Medya', icon: 'fa-solid fa-circle-play',
        props: {
            videoId: { type: 'text', label: 'YouTube ID', group: 'content', default: 'dQw4w9WgXcQ' },
            ...universalProps
        }
    },

    iconbox: {
        name: 'İkon Kutusu', category: 'Gelişmiş', icon: 'fa-solid fa-box',
        props: {
            icon: { type: 'select', label: 'İkon', group: 'content', options: ['fa-solid fa-rocket', 'fa-solid fa-shield-halved', 'fa-solid fa-laptop', 'fa-solid fa-gem'], default: 'fa-solid fa-rocket' },
            title: { type: 'text', label: 'Başlık', group: 'content', default: 'Performans' },
            content: { type: 'textarea', label: 'İçerik', group: 'content', default: 'Yüksek teknoloji.' },
            align: { type: 'select', label: 'Hizalama', group: 'style', options: ['text-start', 'text-center'], default: 'text-center' },
            ...universalProps
        }
    },
    card: {
        name: 'İçerik Kartı', category: 'Gelişmiş', icon: 'fa-solid fa-rectangle-list',
        props: {
            image: { type: 'text', label: 'Görsel', group: 'content', default: 'https://placehold.co/600x400/f8f9fa/333?text=KART' },
            title: { type: 'text', label: 'Başlık', group: 'content', default: 'Hizmet' },
            content: { type: 'textarea', label: 'İçerik', group: 'content', default: 'Çözümlerimiz.' },
            btnText: { type: 'text', label: 'Buton Metni', group: 'content', default: 'Detaylar' },
            btnLink: { type: 'text', label: 'Buton Linki', group: 'content', default: '#' },
            ...universalProps
        }
    },
    progress: {
        name: 'Yetenek Barı', category: 'Gelişmiş', icon: 'fa-solid fa-bars-progress',
        props: {
            title: { type: 'text', label: 'Yetenek Adı', group: 'content', default: 'Vue.js & Front-End' },
            percentage: { type: 'select', label: 'Yüzde (%)', group: 'content', options: ['10', '25', '50', '75', '90', '100'], default: '90' },
            barColor: { type: 'select', label: 'Bar Rengi', group: 'style', options: ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-dark'], default: 'bg-primary' },
            ...universalProps
        }
    },
    testimonial: {
        name: 'Müşteri Yorumu', category: 'Gelişmiş', icon: 'fa-solid fa-quote-left',
        props: {
            quote: { type: 'textarea', label: 'Yorum', group: 'content', default: 'Harika bir dijital ajans deneyimi yaşadık. Süreç çok profesyoneldi.' },
            name: { type: 'text', label: 'Müşteri Adı', group: 'content', default: 'Ahmet Yılmaz' },
            company: { type: 'text', label: 'Şirket/Unvan', group: 'content', default: 'CEO, TechCorp' },
            avatar: { type: 'text', label: 'Profil Fotoğrafı URL', group: 'content', default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
            ...universalProps
        }
    },
    shortcode: {
        name: 'Kısa Kod', category: 'Gelişmiş', icon: 'fa-solid fa-code',
        props: {
            code: { type: 'text', label: 'Kısa Kod', group: 'content', default: '[iletisim_formu]' },
            description: { type: 'text', label: 'Modül Açıklaması (Editörde Görünür)', group: 'content', default: 'İletişim Formu Modülü' },
            ...universalProps
        }
    },
    pricing: {
        name: 'Fiyat Tablosu', category: 'Gelişmiş', icon: 'fa-solid fa-tags',
        props: {
            planName: { type: 'text', label: 'Plan Adı', group: 'content', default: 'Pro Paket' },
            price: { type: 'text', label: 'Fiyat', group: 'content', default: '₺999' },
            period: { type: 'text', label: 'Periyot', group: 'content', default: '/aylık' },
            features: { type: 'textarea', label: 'Özellikler (Her satıra bir tane)', group: 'content', default: "Sınırsız Proje\n7/24 Destek\nÖzel Alan Adı" },
            btnText: { type: 'text', label: 'Buton Metni', group: 'content', default: 'Hemen Al' },
            btnLink: { type: 'text', label: 'Buton Linki', group: 'content', default: '#' },
            isPopular: { type: 'select', label: 'Popüler Etiketi', group: 'style', options: ['', 'Göster'], default: '' },
            ...universalProps
        }
    },
    accordion: {
        name: 'Akordeon (SSS)', category: 'Gelişmiş', icon: 'fa-solid fa-list-ul',
        props: {
            items: {
                type: 'repeater',
                label: 'Soru & Cevap Listesi',
                group: 'content',
                subFields: {
                    title: { type: 'text', label: 'Soru', default: 'Süreciniz nasıl işliyor?' },
                    content: { type: 'textarea', label: 'Cevap', default: 'Önce analiz ediyor, sonra geliştiriyoruz.' }
                },
                default: [
                    { title: 'Projeler ne kadar sürer?', content: 'Kapsama göre 2 ile 6 hafta arası sürmektedir.' },
                    { title: 'Revizyon hakkımız var mı?', content: 'Tasarım aşamasında sınırsız revizyon sunuyoruz.' }
                ]
            },
            ...universalProps
        }
    }
};