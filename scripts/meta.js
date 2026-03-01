/**
 * Meta descriptions for all pages × languages.
 * Used by build.js to set <meta description>, og:title, og:description.
 *
 * Key = page slug ('' for index/home page)
 *
 * SEO strategy: target "specialist + city" queries (Category A)
 * Each description includes: name, location (Warszawa/Ursus), services, trust signal, CTA
 */

const SITE_URL = 'https://osteojump.pl';

const pageMeta = {
  '': {
    pl: {
      description: 'Osteopata Hanna Bykava w Warszawie (Ursus). Leczenie osteopatyczne dzieci, dorosłych i kobiet w ciąży. Ocena 5.0, 150+ opinii. Umów wizytę online.',
      ogTitle: 'OsteoJump — Osteopata Warszawa, Ursus',
      ogDescription: 'Osteopata Hanna Bykava. Leczenie osteopatyczne dzieci, dorosłych i kobiet w ciąży. Umów wizytę online.',
    },
    en: {
      description: 'Experienced osteopath Hanna Bykava in Warsaw (Ursus). Gentle osteopathic treatment for children, adults and pregnant women. Rated 5.0, 150+ reviews. Book online.',
      ogTitle: 'OsteoJump — Osteopath in Warsaw',
      ogDescription: 'Experienced osteopath Hanna Bykava. Gentle treatment for children, adults and pregnant women. Book online.',
    },
    ru: {
      description: 'Опытный остеопат Анна Быкова в Варшаве (Урсус). Мягкое лечение детей, взрослых и беременных. Оценка 5.0, 150+ отзывов. Запишитесь онлайн.',
      ogTitle: 'OsteoJump — Остеопат в Варшаве',
      ogDescription: 'Опытный остеопат Анна Быкова. Мягкое лечение детей, взрослых и беременных. Запись онлайн.',
    },
    uk: {
      description: 'Досвідчений остеопат Анна Бикова у Варшаві (Урсус). М\'яке лікування дітей, дорослих та вагітних. Оцінка 5.0, 150+ відгуків. Запишіться онлайн.',
      ogTitle: 'OsteoJump — Остеопат у Варшаві',
      ogDescription: 'Досвідчений остеопат Анна Бикова. М\'яке лікування дітей, дорослих та вагітних. Запис онлайн.',
    },
    de: {
      description: 'Erfahrene Osteopathin Hanna Bykava in Warschau (Ursus). Sanfte osteopathische Behandlung für Kinder, Erwachsene und Schwangere. 5.0 Bewertung. Online buchen.',
      ogTitle: 'OsteoJump — Osteopathin in Warschau',
      ogDescription: 'Erfahrene Osteopathin Hanna Bykava. Sanfte Behandlung für Kinder, Erwachsene und Schwangere. Online buchen.',
    },
  },

  about: {
    pl: {
      description: 'Osteopata Hanna Bykava — 15 lat w medycynie, 7 lat w osteopatii. Specjalistka od dzieci, kobiet w ciąży i dorosłych. Gabinet w Warszawie (Ursus).',
      ogTitle: 'Hanna Bykava — osteopata Warszawa',
      ogDescription: 'Osteopata specjalistka. 15 lat w medycynie, 7 lat w osteopatii. Dzieci, dorośli, kobiety w ciąży.',
    },
    en: {
      description: 'Osteopath Hanna Bykava — 15 years in medicine, 7 years in osteopathy. Specialist for children, pregnant women and adults. Practice in Warsaw (Ursus).',
      ogTitle: 'Hanna Bykava — Osteopath in Warsaw',
      ogDescription: 'Experienced osteopath. 15 years in medicine, 7 years in osteopathy. Children, adults, pregnant women.',
    },
    ru: {
      description: 'Остеопат Анна Быкова — 15 лет в медицине, 7 лет в остеопатии. Специалист по детям, беременным и взрослым. Кабинет в Варшаве (Урсус).',
      ogTitle: 'Анна Быкова — остеопат в Варшаве',
      ogDescription: 'Опытный остеопат. 15 лет в медицине, 7 лет в остеопатии. Дети, взрослые, беременные.',
    },
    uk: {
      description: 'Остеопат Анна Бикова — 15 років у медицині, 7 років в остеопатії. Спеціаліст по дітях, вагітних та дорослих. Кабінет у Варшаві (Урсус).',
      ogTitle: 'Анна Бикова — остеопат у Варшаві',
      ogDescription: 'Досвідчений остеопат. 15 років у медицині, 7 років в остеопатії. Діти, дорослі, вагітні.',
    },
    de: {
      description: 'Osteopathin Hanna Bykava — 15 Jahre Medizin, 7 Jahre Osteopathie. Spezialistin für Kinder, Schwangere und Erwachsene. Praxis in Warschau (Ursus).',
      ogTitle: 'Hanna Bykava — Osteopathin in Warschau',
      ogDescription: 'Erfahrene Osteopathin. 15 Jahre Medizin, 7 Jahre Osteopathie. Kinder, Erwachsene, Schwangere.',
    },
  },

  prices: {
    pl: {
      description: 'Cennik osteopaty w Warszawie. Sesja osteopatyczna 290 zł (55 min), konsultacja 120 zł (20 min). Pakiety wizyt. Gabinet OsteoJump, Ursus.',
      ogTitle: 'Cennik osteopaty — OsteoJump Warszawa',
      ogDescription: 'Sesja osteopatyczna 290 zł, konsultacja 120 zł. Pakiety wizyt. Gabinet w Warszawie.',
    },
    en: {
      description: 'Osteopath prices in Warsaw. Osteopathic session 290 PLN (55 min), consultation 120 PLN (20 min). Visit packages. OsteoJump, Ursus district.',
      ogTitle: 'Prices — OsteoJump Warsaw',
      ogDescription: 'Osteopathic session 290 PLN, consultation 120 PLN. Visit packages available.',
    },
    ru: {
      description: 'Цены остеопата в Варшаве. Сеанс остеопатии 290 zł (55 мин), консультация 120 zł (20 мин). Пакеты визитов. OsteoJump, Урсус.',
      ogTitle: 'Цены — OsteoJump Варшава',
      ogDescription: 'Сеанс остеопатии 290 zł, консультация 120 zł. Пакеты визитов.',
    },
    uk: {
      description: 'Ціни остеопата у Варшаві. Сеанс остеопатії 290 zł (55 хв), консультація 120 zł (20 хв). Пакети візитів. OsteoJump, Урсус.',
      ogTitle: 'Ціни — OsteoJump Варшава',
      ogDescription: 'Сеанс остеопатії 290 zł, консультація 120 zł. Пакети візитів.',
    },
    de: {
      description: 'Osteopathie-Preise in Warschau. Sitzung 290 PLN (55 Min.), Beratung 120 PLN (20 Min.). Besuchspakete. OsteoJump, Ursus.',
      ogTitle: 'Preise — OsteoJump Warschau',
      ogDescription: 'Osteopathische Sitzung 290 PLN, Beratung 120 PLN. Besuchspakete verfügbar.',
    },
  },

  reviews: {
    pl: {
      description: 'Opinie pacjentów osteopaty Hanny Bykavej. Ocena 5.0 na Google i Booksy, 150+ opinii. Laureatka Orły Medycyny 2025. OsteoJump Warszawa.',
      ogTitle: 'Opinie pacjentów — OsteoJump Warszawa',
      ogDescription: 'Ocena 5.0, 150+ opinii. Laureatka Orły Medycyny 2025.',
    },
    en: {
      description: 'Patient reviews of osteopath Hanna Bykava in Warsaw. 5.0 rating on Google and Booksy, 150+ reviews. Winner of Orły Medycyny 2025 award.',
      ogTitle: 'Patient Reviews — OsteoJump Warsaw',
      ogDescription: '5.0 rating, 150+ reviews. Winner of Orły Medycyny 2025 award.',
    },
    ru: {
      description: 'Отзывы пациентов остеопата Анны Быковой в Варшаве. Оценка 5.0 на Google и Booksy, 150+ отзывов. Лауреат Orły Medycyny 2025.',
      ogTitle: 'Отзывы пациентов — OsteoJump Варшава',
      ogDescription: 'Оценка 5.0, 150+ отзывов. Лауреат Orły Medycyny 2025.',
    },
    uk: {
      description: 'Відгуки пацієнтів остеопата Анни Бикової у Варшаві. Оцінка 5.0 на Google та Booksy, 150+ відгуків. Лауреат Orły Medycyny 2025.',
      ogTitle: 'Відгуки пацієнтів — OsteoJump Варшава',
      ogDescription: 'Оцінка 5.0, 150+ відгуків. Лауреат Orły Medycyny 2025.',
    },
    de: {
      description: 'Patientenbewertungen der Osteopathin Hanna Bykava in Warschau. 5.0 auf Google und Booksy, 150+ Bewertungen. Preisträgerin Orły Medycyny 2025.',
      ogTitle: 'Patientenbewertungen — OsteoJump Warschau',
      ogDescription: '5.0 Bewertung, 150+ Bewertungen. Preisträgerin Orły Medycyny 2025.',
    },
  },

  faq: {
    pl: {
      description: 'Pytania o osteopatię: dla kogo, jak się przygotować, ile trwa sesja, czy boli, ile kosztuje. Odpowiedzi osteopaty z Warszawy.',
      ogTitle: 'FAQ — Osteopata Warszawa | OsteoJump',
      ogDescription: 'Odpowiedzi na najczęstsze pytania o osteopatii, wizytach i leczeniu.',
    },
    en: {
      description: 'Osteopathy FAQ: who is it for, how to prepare, session duration, does it hurt, pricing. Answers from an osteopath in Warsaw.',
      ogTitle: 'FAQ — Osteopath Warsaw | OsteoJump',
      ogDescription: 'Answers to common questions about osteopathy, appointments and treatment.',
    },
    ru: {
      description: 'Вопросы об остеопатии: для кого, как подготовиться, сколько длится сеанс, больно ли, сколько стоит. Ответы остеопата в Варшаве.',
      ogTitle: 'Вопросы — Остеопат Варшава | OsteoJump',
      ogDescription: 'Ответы на частые вопросы об остеопатии, визитах и лечении.',
    },
    uk: {
      description: 'Питання про остеопатію: для кого, як підготуватися, скільки триває сеанс, чи боляче, скільки коштує. Відповіді остеопата у Варшаві.',
      ogTitle: 'Питання — Остеопат Варшава | OsteoJump',
      ogDescription: 'Відповіді на часті запитання про остеопатію, візити та лікування.',
    },
    de: {
      description: 'Osteopathie-FAQ: für wen, Vorbereitung, Sitzungsdauer, Schmerzen, Kosten. Antworten einer Osteopathin in Warschau.',
      ogTitle: 'FAQ — Osteopathin Warschau | OsteoJump',
      ogDescription: 'Antworten auf häufige Fragen zu Osteopathie, Terminen und Behandlung.',
    },
  },

  education: {
    pl: {
      description: 'Wykształcenie osteopaty Hanny Bykavej. Uniwersytet medyczny, specjalizacja osteopatyczna, certyfikaty i kursy. 15 lat w medycynie.',
      ogTitle: 'Wykształcenie osteopaty — OsteoJump Warszawa',
      ogDescription: 'Dyplomy, certyfikaty i kwalifikacje osteopaty Hanny Bykavej. 15 lat doświadczenia.',
    },
    en: {
      description: 'Education of osteopath Hanna Bykava. Medical university, osteopathic specialization, certificates and courses. 15 years in medicine.',
      ogTitle: 'Osteopath Education — OsteoJump Warsaw',
      ogDescription: 'Diplomas, certificates and qualifications. 15 years of medical experience.',
    },
    ru: {
      description: 'Образование остеопата Анны Быковой. Медицинский университет, специализация по остеопатии, сертификаты и курсы. 15 лет в медицине.',
      ogTitle: 'Образование остеопата — OsteoJump Варшава',
      ogDescription: 'Дипломы, сертификаты и квалификация остеопата Анны Быковой. 15 лет опыта.',
    },
    uk: {
      description: 'Освіта остеопата Анни Бикової. Медичний університет, спеціалізація з остеопатії, сертифікати та курси. 15 років у медицині.',
      ogTitle: 'Освіта остеопата — OsteoJump Варшава',
      ogDescription: 'Дипломи, сертифікати та кваліфікація остеопата Анни Бикової. 15 років досвіду.',
    },
    de: {
      description: 'Ausbildung der Osteopathin Hanna Bykava. Medizinstudium, osteopathische Spezialisierung, Zertifikate und Kurse. 15 Jahre Medizin.',
      ogTitle: 'Ausbildung der Osteopathin — OsteoJump Warschau',
      ogDescription: 'Diplome, Zertifikate und Qualifikationen. 15 Jahre medizinische Erfahrung.',
    },
  },

  location: {
    pl: {
      description: 'Gabinet osteopatyczny OsteoJump — Siłaczki 3/9, Warszawa Ursus. 500m od PKP Ursus. Mapa, dojazd komunikacją miejską i samochodem.',
      ogTitle: 'Gabinet osteopaty Warszawa Ursus — OsteoJump',
      ogDescription: 'Siłaczki 3/9, Warszawa Ursus. 500m od stacji PKP. Mapa i dojazd.',
    },
    en: {
      description: 'OsteoJump osteopathic practice — Siłaczki 3/9, Warsaw Ursus. 500m from PKP Ursus station. Map, public transport and driving directions.',
      ogTitle: 'Osteopath Location Warsaw Ursus — OsteoJump',
      ogDescription: 'Siłaczki 3/9, Warsaw Ursus. 500m from PKP station. Map and directions.',
    },
    ru: {
      description: 'Кабинет остеопата OsteoJump — Siłaczki 3/9, Варшава, Урсус. 500м от станции PKP. Карта, маршрут на транспорте и машине.',
      ogTitle: 'Кабинет остеопата Варшава Урсус — OsteoJump',
      ogDescription: 'Siłaczki 3/9, Варшава, Урсус. 500м от станции PKP. Карта и маршрут.',
    },
    uk: {
      description: 'Кабінет остеопата OsteoJump — Siłaczki 3/9, Варшава, Урсус. 500м від станції PKP. Карта, маршрут транспортом та автомобілем.',
      ogTitle: 'Кабінет остеопата Варшава Урсус — OsteoJump',
      ogDescription: 'Siłaczki 3/9, Варшава, Урсус. 500м від станції PKP. Карта та маршрут.',
    },
    de: {
      description: 'Osteopathische Praxis OsteoJump — Siłaczki 3/9, Warschau Ursus. 500m vom Bahnhof PKP Ursus. Karte, Anreise mit ÖPNV und Auto.',
      ogTitle: 'Osteopathie-Praxis Warschau Ursus — OsteoJump',
      ogDescription: 'Siłaczki 3/9, Warschau Ursus. 500m vom Bahnhof. Karte und Anreise.',
    },
  },

  contacts: {
    pl: {
      description: 'Kontakt z osteopatą w Warszawie. Telefon, WhatsApp, Telegram. Umów wizytę osteopatyczną online przez Booksy. OsteoJump, Ursus.',
      ogTitle: 'Kontakt — Osteopata Warszawa | OsteoJump',
      ogDescription: 'Telefon, WhatsApp, Telegram. Umów wizytę osteopatyczną online.',
    },
    en: {
      description: 'Contact osteopath in Warsaw. Phone, WhatsApp, Telegram. Book an osteopathic appointment online via Booksy. OsteoJump, Ursus.',
      ogTitle: 'Contact — Osteopath Warsaw | OsteoJump',
      ogDescription: 'Phone, WhatsApp, Telegram. Book an osteopathic appointment online.',
    },
    ru: {
      description: 'Связаться с остеопатом в Варшаве. Телефон, WhatsApp, Telegram. Запись на приём онлайн через Booksy. OsteoJump, Урсус.',
      ogTitle: 'Контакты — Остеопат Варшава | OsteoJump',
      ogDescription: 'Телефон, WhatsApp, Telegram. Запись на приём к остеопату онлайн.',
    },
    uk: {
      description: 'Зв\'язатися з остеопатом у Варшаві. Телефон, WhatsApp, Telegram. Запис на прийом онлайн через Booksy. OsteoJump, Урсус.',
      ogTitle: 'Контакти — Остеопат Варшава | OsteoJump',
      ogDescription: 'Телефон, WhatsApp, Telegram. Запис на прийом до остеопата онлайн.',
    },
    de: {
      description: 'Kontakt zur Osteopathin in Warschau. Telefon, WhatsApp, Telegram. Osteopathie-Termin online über Booksy buchen. OsteoJump, Ursus.',
      ogTitle: 'Kontakt — Osteopathin Warschau | OsteoJump',
      ogDescription: 'Telefon, WhatsApp, Telegram. Osteopathie-Termin online buchen.',
    },
  },

  osteopathy: {
    pl: {
      description: 'Czym jest osteopatia i jak działa. Diagnostyka, leczenie osteopatyczne, zasady pracy z ciałem. Wyjaśnia osteopata z Warszawy.',
      ogTitle: 'Czym jest osteopatia — OsteoJump Warszawa',
      ogDescription: 'Jak działa osteopatia: diagnostyka, leczenie, zasady pracy z ciałem.',
    },
    en: {
      description: 'What is osteopathy and how it works. Diagnostics, osteopathic treatment, principles of bodywork. Explained by an osteopath in Warsaw.',
      ogTitle: 'What is Osteopathy — OsteoJump Warsaw',
      ogDescription: 'How osteopathy works: diagnostics, treatment, principles of bodywork.',
    },
    ru: {
      description: 'Что такое остеопатия и как она работает. Диагностика, лечение, принципы работы с телом. Объясняет остеопат в Варшаве.',
      ogTitle: 'Что такое остеопатия — OsteoJump Варшава',
      ogDescription: 'Как работает остеопатия: диагностика, лечение, принципы работы с телом.',
    },
    uk: {
      description: 'Що таке остеопатія і як вона працює. Діагностика, лікування, принципи роботи з тілом. Пояснює остеопат у Варшаві.',
      ogTitle: 'Що таке остеопатія — OsteoJump Варшава',
      ogDescription: 'Як працює остеопатія: діагностика, лікування, принципи роботи з тілом.',
    },
    de: {
      description: 'Was ist Osteopathie und wie funktioniert sie. Diagnostik, Behandlung, Prinzipien der Körperarbeit. Erklärt von einer Osteopathin in Warschau.',
      ogTitle: 'Was ist Osteopathie — OsteoJump Warschau',
      ogDescription: 'Wie Osteopathie funktioniert: Diagnostik, Behandlung, Körperarbeit.',
    },
  },

  consultation: {
    pl: {
      description: 'Konsultacja osteopatyczna online — 20 min, 120 zł. Omówienie problemu, diagnostyka, zalecenia. Osteopata Hanna Bykava, Warszawa.',
      ogTitle: 'Konsultacja osteopatyczna — OsteoJump Warszawa',
      ogDescription: 'Konsultacja online 20 min, 120 zł. Omówienie problemu i zalecenia.',
    },
    en: {
      description: 'Online osteopathic consultation — 20 min, 120 PLN. Problem discussion, diagnostics, recommendations. Osteopath Hanna Bykava, Warsaw.',
      ogTitle: 'Osteopathic Consultation — OsteoJump Warsaw',
      ogDescription: 'Online consultation 20 min, 120 PLN. Problem discussion and recommendations.',
    },
    ru: {
      description: 'Онлайн-консультация остеопата — 20 мин, 120 zł. Обсуждение проблемы, диагностика, рекомендации. Остеопат Анна Быкова, Варшава.',
      ogTitle: 'Консультация остеопата — OsteoJump Варшава',
      ogDescription: 'Онлайн-консультация 20 мин, 120 zł. Обсуждение проблемы и рекомендации.',
    },
    uk: {
      description: 'Онлайн-консультація остеопата — 20 хв, 120 zł. Обговорення проблеми, діагностика, рекомендації. Остеопат Анна Бикова, Варшава.',
      ogTitle: 'Консультація остеопата — OsteoJump Варшава',
      ogDescription: 'Онлайн-консультація 20 хв, 120 zł. Обговорення проблеми та рекомендації.',
    },
    de: {
      description: 'Osteopathische Online-Beratung — 20 Min., 120 PLN. Problemdiskussion, Diagnostik, Empfehlungen. Osteopathin Hanna Bykava, Warschau.',
      ogTitle: 'Osteopathie-Beratung — OsteoJump Warschau',
      ogDescription: 'Online-Beratung 20 Min., 120 PLN. Problemdiskussion und Empfehlungen.',
    },
  },

  'osteopatia-terapia-manualna': {
    pl: {
      description: 'Czym osteopatia różni się od terapii manualnej? Porównanie metod, różnice w podejściu diagnostycznym i zakresie pracy z ciałem. Osteopata Warszawa — OsteoJump.',
      ogTitle: 'Osteopatia a terapia manualna — porównanie | OsteoJump',
      ogDescription: 'Różnice między osteopatią a terapią manualną. Kiedy wybrać osteopatę, a kiedy terapeutę manualnego.',
    },
    en: {
      description: 'How does osteopathy differ from manual therapy? Comparison of methods, diagnostic approaches and scope of bodywork. Osteopath in Warsaw — OsteoJump.',
      ogTitle: 'Osteopathy vs Manual Therapy — Comparison | OsteoJump',
      ogDescription: 'Differences between osteopathy and manual therapy. When to choose an osteopath.',
    },
    ru: {
      description: 'Чем остеопатия отличается от мануальной терапии? Сравнение методов, различия в диагностике и подходе к лечению. Остеопат в Варшаве — OsteoJump.',
      ogTitle: 'Остеопатия и мануальная терапия — сравнение | OsteoJump',
      ogDescription: 'Различия между остеопатией и мануальной терапией. Когда выбрать остеопата.',
    },
    uk: {
      description: 'Чим остеопатія відрізняється від мануальної терапії? Порівняння методів, відмінності в діагностиці та підході до лікування. Остеопат у Варшаві — OsteoJump.',
      ogTitle: 'Остеопатія та мануальна терапія — порівняння | OsteoJump',
      ogDescription: 'Відмінності між остеопатією та мануальною терапією. Коли обрати остеопата.',
    },
    de: {
      description: 'Wie unterscheidet sich Osteopathie von manueller Therapie? Methodenvergleich, Unterschiede in Diagnostik und Behandlung. Osteopathin in Warschau — OsteoJump.',
      ogTitle: 'Osteopathie und manuelle Therapie — Vergleich | OsteoJump',
      ogDescription: 'Unterschiede zwischen Osteopathie und manueller Therapie. Wann einen Osteopathen wählen.',
    },
  },

  'osteopatia-masaz-leczniczy': {
    pl: {
      description: 'Czym osteopatia różni się od masażu leczniczego? Porównanie metod, kiedy wybrać masaż, a kiedy osteopatę. Osteopata i masażystka w Warszawie — OsteoJump.',
      ogTitle: 'Osteopatia a masaż leczniczy — porównanie | OsteoJump',
      ogDescription: 'Różnice między osteopatią a masażem leczniczym. Kiedy wybrać osteopatę, a kiedy masażystę.',
    },
    en: {
      description: 'How does osteopathy differ from therapeutic massage? Comparison of methods, when to choose massage and when to choose an osteopath. Osteopath in Warsaw — OsteoJump.',
      ogTitle: 'Osteopathy vs Therapeutic Massage — Comparison | OsteoJump',
      ogDescription: 'Differences between osteopathy and therapeutic massage. When to choose an osteopath.',
    },
    ru: {
      description: 'Чем остеопатия отличается от лечебного массажа? Сравнение методов, когда выбрать массаж, а когда остеопата. Остеопат и массажист в Варшаве — OsteoJump.',
      ogTitle: 'Остеопатия и лечебный массаж — сравнение | OsteoJump',
      ogDescription: 'Различия между остеопатией и лечебным массажем. Когда выбрать остеопата.',
    },
    uk: {
      description: 'Чим остеопатія відрізняється від лікувального масажу? Порівняння методів, коли обрати масаж, а коли остеопата. Остеопат у Варшаві — OsteoJump.',
      ogTitle: 'Остеопатія та лікувальний масаж — порівняння | OsteoJump',
      ogDescription: 'Відмінності між остеопатією та лікувальним масажем. Коли обрати остеопата.',
    },
    de: {
      description: 'Wie unterscheidet sich Osteopathie von Heilmassage? Methodenvergleich, wann Massage und wann Osteopathie wählen. Osteopathin in Warschau — OsteoJump.',
      ogTitle: 'Osteopathie und Heilmassage — Vergleich | OsteoJump',
      ogDescription: 'Unterschiede zwischen Osteopathie und Heilmassage. Wann einen Osteopathen wählen.',
    },
  },

  appointment: {
    pl: {
      description: 'Jak przebiega wizyta u osteopaty — rozmowa, diagnostyka, praca z ciałem. 55 minut, łagodne techniki. Osteopata Warszawa, OsteoJump.',
      ogTitle: 'Jak przebiega wizyta u osteopaty — OsteoJump',
      ogDescription: 'Etapy wizyty osteopatycznej: rozmowa, diagnostyka, leczenie. 55 minut.',
    },
    en: {
      description: 'How an osteopathic session works — conversation, diagnostics, bodywork. 55 minutes, gentle techniques. Osteopath in Warsaw, OsteoJump.',
      ogTitle: 'How a Session Works — OsteoJump Warsaw',
      ogDescription: 'Osteopathic session stages: conversation, diagnostics, treatment. 55 minutes.',
    },
    ru: {
      description: 'Как проходит приём у остеопата — беседа, диагностика, работа с телом. 55 минут, мягкие техники. Остеопат в Варшаве, OsteoJump.',
      ogTitle: 'Как проходит приём — OsteoJump Варшава',
      ogDescription: 'Этапы остеопатического приёма: беседа, диагностика, лечение. 55 минут.',
    },
    uk: {
      description: 'Як проходить прийом у остеопата — бесіда, діагностика, робота з тілом. 55 хвилин, м\'які техніки. Остеопат у Варшаві, OsteoJump.',
      ogTitle: 'Як проходить прийом — OsteoJump Варшава',
      ogDescription: 'Етапи остеопатичного прийому: бесіда, діагностика, лікування. 55 хвилин.',
    },
    de: {
      description: 'Wie ein Osteopathie-Termin abläuft — Gespräch, Diagnostik, Körperarbeit. 55 Minuten, sanfte Techniken. Osteopathin in Warschau, OsteoJump.',
      ogTitle: 'Wie ein Termin abläuft — OsteoJump Warschau',
      ogDescription: 'Ablauf: Gespräch, Diagnostik, Behandlung. 55 Minuten.',
    },
  },
};

// OG locale codes
const ogLocaleMap = {
  pl: 'pl_PL',
  en: 'en_GB',
  ru: 'ru_RU',
  uk: 'uk_UA',
  de: 'de_DE',
};

module.exports = { pageMeta, ogLocaleMap, SITE_URL };
