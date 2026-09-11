/* ============================================================
   ДАННЫЕ САЙТА. Здесь меняются цены, работы и отзывы.
   Файл открывается любым текстовым редактором.
   ============================================================ */




/* ---------- МАСТЕРА ----------
   Каждый мастер — свой блок на странице: карточка, прайс и работы.

   price — группы услуг: { group: "Название группы", items: [["Услуга", "Цена"], ...] }
   works — работы по направлениям: { title: "Название услуги", shots: ["путь", ...] }

   Прайсы взяты с прайс-листов самих мастеров.                        */

var MASTERS = [
  {
    id: "sabina",
    name: "Сабина",
    role: "Владелец студии, тренер и топ-мастер",
    bio: "Долгие годы упорного труда и большое количество обучений привели к статусу тренера и топ-мастера. Работает с бровями и губами: графичные брови, техника «градиент», пудровое напыление, контур и плотный цвет губ. Понимает запрос с полуслова.",
    photo: "assets/works/master-sabina.jpg",
    photoAlt: "Сабина, владелец студии ISA",
    linkHref: "https://t.me/isa_sabi",
    linkText: "Написать Сабине",
    price: [
      {
        group: "Перманентный макияж бровей и губ",
        items: [
          ["Первичная процедура", "9 000 ₽"],
          ["Коррекция до 1,5 месяца", "4 000 ₽"],
          ["Обновление до 2 лет", "7 000 ₽"],
          ["Губы и брови в одной записи", "скидка 10%"]
        ]
      },
      {
        group: "Тридинг",
        items: [
          ["Тридинг лица, удаление волос нитью", "900 ₽"],
          ["Тридинг одной зоны", "300 ₽"]
        ]
      }
    ],
    works: [
      {
        title: "Перманентный макияж бровей",
        shots: [
          "assets/masters/sabina-brows-01.jpg",
          "assets/masters/sabina-brows-02.jpg",
          "assets/masters/sabina-brows-03.jpg",
          "assets/masters/sabina-brows-04.jpg",
          "assets/masters/sabina-brows-05.jpg",
          "assets/masters/sabina-brows-06.jpg",
          "assets/masters/sabina-brows-07.jpg"
        ]
      },
      {
        title: "Перманентный макияж губ",
        shots: [
          "assets/masters/sabina-lips-01.jpg",
          "assets/masters/sabina-lips-02.jpg",
          "assets/masters/sabina-lips-03.jpg",
          "assets/masters/sabina-lips-04.jpg",
          "assets/masters/sabina-lips-05.jpg",
          "assets/masters/sabina-lips-06.jpg"
        ]
      }
    ]
  },

  {
    id: "dinara",
    name: "Динара",
    role: "Мастер студии",
    bio: "Медицинское образование, обучение в этой же студии, опыт работы больше двух лет. Отвечает за комфорт клиента во время процедуры и относится к каждому с большим вниманием.",
    photo: "assets/works/master-dinara.jpg",
    photoAlt: "Динара, мастер студии ISA",
    linkHref: "#contacts",
    linkText: "Записаться к Динаре",
    price: [
      {
        group: "Перманентный макияж бровей и губ",
        items: [
          ["Первичная процедура", "7 000 ₽"],
          ["Коррекция до 1,5 месяца", "4 000 ₽"],
          ["Обновление до 2 лет", "6 000 ₽"],
          ["Губы и брови в одной записи", "скидка 10%"]
        ]
      },
      {
        group: "Брови",
        items: [
          ["Ламинирование с коррекцией и окрашиванием", "1 400 ₽"],
          ["Коррекция и окрашивание", "900 ₽"]
        ]
      }
    ],
    works: [
      {
        title: "Перманентный макияж бровей",
        shots: [
          "assets/masters/dinara-brows-01.jpg",
          "assets/masters/dinara-brows-02.jpg",
          "assets/masters/dinara-brows-03.jpg",
          "assets/masters/dinara-brows-04.jpg",
          "assets/masters/dinara-brows-05.jpg"
        ]
      },
      {
        title: "Перманентный макияж губ",
        shots: [
          "assets/masters/dinara-lips-01.jpg",
          "assets/masters/dinara-lips-02.jpg",
          "assets/masters/dinara-lips-03.jpg",
          "assets/masters/dinara-lips-04.jpg",
          "assets/masters/dinara-lips-05.jpg",
          "assets/masters/dinara-lips-06.jpg"
        ]
      },
      {
        title: "Ламинирование, коррекция и окрашивание",
        shots: [
          "assets/masters/dinara-lami-01.jpg",
          "assets/masters/dinara-lami-02.jpg",
          "assets/masters/dinara-lami-03.jpg"
        ]
      }
    ]
  },

  {
    id: "diana",
    name: "Диана Чернова",
    role: "Врач-косметолог студии",
    bio: "Ведёт косметологическое направление. Любит естественные результаты, индивидуальный подход и комплексную заботу о коже. Программа подбирается на очном приёме.",
    photo: "assets/works/master-diana.jpg",
    photoAlt: "Диана Чернова, врач-косметолог студии ISA",
    patch: true,
    linkHref: "https://www.instagram.com/dr.chernova.diana/",
    linkText: "Профиль Дианы",
    price: [
      {
        group: "Ботулинотерапия",
        items: [
          ["Лоб и межбровье, Корея", "5 000 ₽"],
          ["Лоб и межбровье, Релатокс", "7 000 ₽"],
          ["Лоб, межбровье и зона вокруг глаз, Корея", "6 000 ₽"],
          ["Лоб, межбровье и зона вокруг глаз, Релатокс", "8 000 ₽"],
          ["Full face, Корея", "13 000 ₽"],
          ["Full face, Релатокс", "18 000 ₽"]
        ]
      },
      {
        group: "Контурная пластика губ",
        items: [
          ["Tesoro", "7 000 ₽"],
          ["Revolax", "7 000 ₽"],
          ["Stylage M", "10 000 ₽"],
          ["Выведение гиалуронидазой, полное", "3 000 ₽"],
          ["Выведение гиалуронидазой, частичное", "1 500 ₽"]
        ]
      },
      {
        group: "Биоревитализация",
        items: [
          ["Bellarti, все виды", "12 000 ₽"],
          ["Mezo-Xanthin, Mezo-Wharton", "12 000 ₽"],
          ["Novacutan Y-Bio, S-Bio", "11 000 ₽"],
          ["Novacutan Gentle, Bright", "12 000 ₽"],
          ["Nucleoform, Nucleoform Rich", "11 000 ₽"]
        ]
      },
      {
        group: "Коллагенотерапия",
        items: [
          ["COLLOST Micro", "12 000 ₽"],
          ["COLLOST Micro под глаза", "6 500 ₽"],
          ["Agentcol", "9 000 ₽"]
        ]
      },
      {
        group: "Липолитики",
        items: [
          ["Light Fit, 2 мл", "3 000 ₽"],
          ["Biogel Стройность, 2 мл", "9 000 ₽"],
          ["Lipolong, 4 мл", "8 000 ₽"]
        ]
      },
      {
        group: "Чистки и пилинги",
        items: [
          ["Комбинированная чистка лица, пилинг в подарок", "2 500 ₽"],
          ["Пилинг PRX-T33", "2 500 ₽"],
          ["Пилинг PEACH PEEL", "2 500 ₽"],
          ["Пилинг BIOREPEEL", "2 500 ₽"]
        ]
      },
      {
        group: "Мезотерапия и консультация",
        items: [
          ["Мезотерапия волос", "2 500 ₽"],
          ["Подбор домашнего ухода, очно или онлайн", "1 500 ₽"]
        ]
      }
    ],
    works: [
      {
        title: "Ботулинотерапия",
        shots: [
          "assets/masters/diana-botox-01.jpg",
          "assets/masters/diana-botox-02.jpg",
          "assets/masters/diana-botox-03.jpg"
        ]
      },
      {
        title: "Контурная пластика губ",
        shots: [
          "assets/masters/diana-lips-01.jpg",
          "assets/masters/diana-lips-02.jpg",
          "assets/masters/diana-lips-03.jpg"
        ]
      }
    ]
  }
];

/* ---------- РАБОТЫ ----------
   Настоящие работы студии, взяты из сообщества ВКонтакте
   vk.ru/club235192174 в сентябре 2026 года.

   Чтобы добавить новую: положите файл в assets/works/
   и впишите строку сюда. Первый кадр показывается крупным,
   остальные — обычными плитками. Держите общее количество
   кратным сетке: 9, 13, 17 кадров заполняют её без пустот.

   alt — короткое описание для поиска и программ чтения с экрана. */

var WORKS = [
  { src: "assets/works/brows-macro.jpg", alt: "Перманентный макияж бровей крупным планом, волосковая техника" },
  { src: "assets/works/lips-01.jpg",     alt: "Перманентный макияж губ: контур и плотный цвет" },
  { src: "assets/works/brows-01.jpg",    alt: "Брови после процедуры, клиентка студии" },
  { src: "assets/works/portrait-01.jpg", alt: "Портрет клиентки: брови и губы после перманентного макияжа" },
  { src: "assets/works/brows-02.jpg",    alt: "Форма бровей после коррекции и перманента" },
  { src: "assets/works/process-01.jpg",  alt: "Работа мастера: процедура перманентного макияжа" },
  { src: "assets/works/portrait-02.jpg", alt: "Клиентка студии после процедуры" },
  { src: "assets/works/brows-03.jpg",    alt: "Зажившие брови без макияжа" },
  { src: "assets/works/brows-04.jpg",    alt: "Брови крупным планом после перманентного макияжа" }
];

/* ---------- ОТЗЫВЫ ----------
   Пока массив пустой, на сайте показывается ссылка на отзывы
   в Instagram. Добавляйте только настоящие отзывы клиентов:

   { text: "Текст отзыва", who: "Имя" }                              */

var REVIEWS = [];
