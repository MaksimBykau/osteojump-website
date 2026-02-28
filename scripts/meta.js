/**
 * Meta descriptions for all pages × languages.
 * Used by build.js to set <meta description>, og:title, og:description.
 *
 * Key = page slug ('' for index/home page)
 */

const SITE_URL = 'https://osteojump.pl';

const pageMeta = {
  '': {
    pl: {
      description: 'Osteopata Hanna Bykava w Warszawie. Łagodne techniki osteopatyczne dla dzieci, dorosłych i kobiet w ciąży. Umów wizytę online.',
      ogTitle: 'OsteoJump — Osteopata w Warszawie',
      ogDescription: 'Osteopata Hanna Bykava. Łagodne techniki dla dzieci, dorosłych i kobiet w ciąży. Umów wizytę online.',
    },
    en: {
      description: 'Osteopath Hanna Bykava in Warsaw. Gentle osteopathic techniques for children, adults and pregnant women. Book an appointment online.',
      ogTitle: 'OsteoJump — Osteopath in Warsaw',
      ogDescription: 'Osteopath Hanna Bykava. Gentle techniques for children, adults and pregnant women. Book online.',
    },
    ru: {
      description: 'Остеопат Анна Быкова в Варшаве. Мягкие остеопатические техники для детей, взрослых и беременных. Запишитесь онлайн.',
      ogTitle: 'OsteoJump — Остеопат в Варшаве',
      ogDescription: 'Остеопат Анна Быкова. Мягкие техники для детей, взрослых и беременных. Запись онлайн.',
    },
    uk: {
      description: 'Остеопат Анна Бикова у Варшаві. М\'які остеопатичні техніки для дітей, дорослих та вагітних. Запишіться онлайн.',
      ogTitle: 'OsteoJump — Остеопат у Варшаві',
      ogDescription: 'Остеопат Анна Бикова. М\'які техніки для дітей, дорослих та вагітних. Запис онлайн.',
    },
    de: {
      description: 'Osteopathin Hanna Bykava in Warschau. Sanfte osteopathische Techniken für Kinder, Erwachsene und Schwangere. Online-Termin buchen.',
      ogTitle: 'OsteoJump — Osteopathin in Warschau',
      ogDescription: 'Osteopathin Hanna Bykava. Sanfte Techniken für Kinder, Erwachsene und Schwangere. Online buchen.',
    },
  },

  about: {
    pl: {
      description: 'Osteopata Hanna Bykava. Pracuję z dziećmi od urodzenia, mamami i dorosłymi. Łagodne techniki, indywidualne podejście. Gabinet w Warszawie.',
      ogTitle: 'Hanna Bykava — osteopata w Warszawie',
      ogDescription: 'Osteopata dla dzieci, dorosłych i kobiet w ciąży. Łagodne techniki, indywidualne podejście.',
    },
    en: {
      description: 'Osteopath Hanna Bykava. I work with children from birth, mothers and adults. Gentle techniques, individual approach. Practice in Warsaw.',
      ogTitle: 'Hanna Bykava — Osteopath in Warsaw',
      ogDescription: 'Osteopath for children, adults and pregnant women. Gentle techniques, individual approach.',
    },
    ru: {
      description: 'Остеопат Анна Быкова. Работаю с детьми с рождения, мамами и взрослыми. Мягкие техники, индивидуальный подход. Кабинет в Варшаве.',
      ogTitle: 'Анна Быкова — остеопат в Варшаве',
      ogDescription: 'Остеопат для детей, взрослых и беременных. Мягкие техники, индивидуальный подход.',
    },
    uk: {
      description: 'Остеопат Анна Бикова. Працюю з дітьми від народження, мамами та дорослими. М\'які техніки, індивідуальний підхід. Кабінет у Варшаві.',
      ogTitle: 'Анна Бикова — остеопат у Варшаві',
      ogDescription: 'Остеопат для дітей, дорослих та вагітних. М\'які техніки, індивідуальний підхід.',
    },
    de: {
      description: 'Osteopathin Hanna Bykava. Ich arbeite mit Kindern ab Geburt, Müttern und Erwachsenen. Sanfte Techniken, individueller Ansatz. Praxis in Warschau.',
      ogTitle: 'Hanna Bykava — Osteopathin in Warschau',
      ogDescription: 'Osteopathin für Kinder, Erwachsene und Schwangere. Sanfte Techniken, individueller Ansatz.',
    },
  },

  prices: {
    pl: {
      description: 'Cennik wizyt osteopatycznych. Konsultacja, sesja osteopatyczna, pakiety wizyt. Gabinet osteopatyczny w Warszawie — OsteoJump.',
      ogTitle: 'Cennik — OsteoJump',
      ogDescription: 'Cennik wizyt osteopatycznych. Konsultacja, sesja, pakiety wizyt.',
    },
    en: {
      description: 'Osteopathic appointment pricing. Consultation, osteopathic session, visit packages. Osteopathic practice in Warsaw — OsteoJump.',
      ogTitle: 'Prices — OsteoJump',
      ogDescription: 'Osteopathic appointment pricing. Consultation, session, visit packages.',
    },
    ru: {
      description: 'Стоимость остеопатических сеансов. Консультация, остеопатический сеанс, пакеты визитов. Кабинет остеопата в Варшаве — OsteoJump.',
      ogTitle: 'Цены — OsteoJump',
      ogDescription: 'Стоимость остеопатических сеансов. Консультация, сеанс, пакеты визитов.',
    },
    uk: {
      description: 'Вартість остеопатичних сеансів. Консультація, остеопатичний сеанс, пакети візитів. Кабінет остеопата у Варшаві — OsteoJump.',
      ogTitle: 'Ціни — OsteoJump',
      ogDescription: 'Вартість остеопатичних сеансів. Консультація, сеанс, пакети візитів.',
    },
    de: {
      description: 'Preise für osteopathische Behandlungen. Beratung, osteopathische Sitzung, Besuchspakete. Osteopathische Praxis in Warschau — OsteoJump.',
      ogTitle: 'Preise — OsteoJump',
      ogDescription: 'Preise für osteopathische Behandlungen. Beratung, Sitzung, Besuchspakete.',
    },
  },

  reviews: {
    pl: {
      description: 'Opinie pacjentów o osteopacie Hanna Bykava. Recenzje z Google, historie pacjentów. Laureatka nagrody Orły Medycyny 2025.',
      ogTitle: 'Opinie — OsteoJump',
      ogDescription: 'Opinie pacjentów. Laureatka nagrody Orły Medycyny 2025.',
    },
    en: {
      description: 'Patient reviews of osteopath Hanna Bykava. Google reviews, patient stories. Winner of Orły Medycyny 2025 award.',
      ogTitle: 'Reviews — OsteoJump',
      ogDescription: 'Patient reviews. Winner of Orły Medycyny 2025 award.',
    },
    ru: {
      description: 'Отзывы пациентов об остеопате Анне Быковой. Отзывы из Google, истории пациентов. Лауреат премии Orły Medycyny 2025.',
      ogTitle: 'Отзывы — OsteoJump',
      ogDescription: 'Отзывы пациентов. Лауреат премии Orły Medycyny 2025.',
    },
    uk: {
      description: 'Відгуки пацієнтів про остеопата Анну Бикову. Відгуки з Google, історії пацієнтів. Лауреат нагороди Orły Medycyny 2025.',
      ogTitle: 'Відгуки — OsteoJump',
      ogDescription: 'Відгуки пацієнтів. Лауреат нагороди Orły Medycyny 2025.',
    },
    de: {
      description: 'Patientenbewertungen der Osteopathin Hanna Bykava. Google-Bewertungen, Patientengeschichten. Preisträgerin Orły Medycyny 2025.',
      ogTitle: 'Bewertungen — OsteoJump',
      ogDescription: 'Patientenbewertungen. Preisträgerin Orły Medycyny 2025.',
    },
  },

  faq: {
    pl: {
      description: 'Często zadawane pytania o osteopatii. Dla kogo jest osteopatia, jak przygotować się do wizyty, ile trwa sesja. OsteoJump Warszawa.',
      ogTitle: 'FAQ — OsteoJump',
      ogDescription: 'Często zadawane pytania o osteopatii i wizytach.',
    },
    en: {
      description: 'Frequently asked questions about osteopathy. Who is osteopathy for, how to prepare for a visit, how long is a session. OsteoJump Warsaw.',
      ogTitle: 'FAQ — OsteoJump',
      ogDescription: 'Frequently asked questions about osteopathy and appointments.',
    },
    ru: {
      description: 'Часто задаваемые вопросы об остеопатии. Для кого остеопатия, как подготовиться к визиту, сколько длится сеанс. OsteoJump Варшава.',
      ogTitle: 'Вопросы — OsteoJump',
      ogDescription: 'Часто задаваемые вопросы об остеопатии и визитах.',
    },
    uk: {
      description: 'Часті запитання про остеопатію. Для кого остеопатія, як підготуватися до візиту, скільки триває сеанс. OsteoJump Варшава.',
      ogTitle: 'Питання — OsteoJump',
      ogDescription: 'Часті запитання про остеопатію та візити.',
    },
    de: {
      description: 'Häufig gestellte Fragen zur Osteopathie. Für wen ist Osteopathie, Vorbereitung auf den Besuch, Sitzungsdauer. OsteoJump Warschau.',
      ogTitle: 'FAQ — OsteoJump',
      ogDescription: 'Häufig gestellte Fragen zur Osteopathie und Behandlungen.',
    },
  },

  education: {
    pl: {
      description: 'Wykształcenie i kwalifikacje osteopaty Hanny Bykavej. Dyplomy, certyfikaty, kursy doskonalenia zawodowego.',
      ogTitle: 'Wykształcenie — OsteoJump',
      ogDescription: 'Wykształcenie i kwalifikacje osteopaty Hanny Bykavej.',
    },
    en: {
      description: 'Education and qualifications of osteopath Hanna Bykava. Diplomas, certificates, professional development courses.',
      ogTitle: 'Education — OsteoJump',
      ogDescription: 'Education and qualifications of osteopath Hanna Bykava.',
    },
    ru: {
      description: 'Образование и квалификация остеопата Анны Быковой. Дипломы, сертификаты, курсы повышения квалификации.',
      ogTitle: 'Образование — OsteoJump',
      ogDescription: 'Образование и квалификация остеопата Анны Быковой.',
    },
    uk: {
      description: 'Освіта та кваліфікація остеопата Анни Бикової. Дипломи, сертифікати, курси підвищення кваліфікації.',
      ogTitle: 'Освіта — OsteoJump',
      ogDescription: 'Освіта та кваліфікація остеопата Анни Бикової.',
    },
    de: {
      description: 'Ausbildung und Qualifikationen der Osteopathin Hanna Bykava. Diplome, Zertifikate, Fortbildungskurse.',
      ogTitle: 'Ausbildung — OsteoJump',
      ogDescription: 'Ausbildung und Qualifikationen der Osteopathin Hanna Bykava.',
    },
  },

  location: {
    pl: {
      description: 'Jak dojechać do gabinetu osteopatycznego OsteoJump w Warszawie. Adres, mapa, dojazd komunikacją miejską i samochodem.',
      ogTitle: 'Jak dojechać — OsteoJump',
      ogDescription: 'Adres gabinetu, mapa, dojazd. Warszawa, dzielnica Ursus.',
    },
    en: {
      description: 'How to get to the OsteoJump osteopathic practice in Warsaw. Address, map, directions by public transport and car.',
      ogTitle: 'Directions — OsteoJump',
      ogDescription: 'Practice address, map, directions. Warsaw, Ursus district.',
    },
    ru: {
      description: 'Как добраться до кабинета остеопата OsteoJump в Варшаве. Адрес, карта, маршрут на общественном транспорте и машине.',
      ogTitle: 'Как добраться — OsteoJump',
      ogDescription: 'Адрес кабинета, карта, маршрут. Варшава, район Ursus.',
    },
    uk: {
      description: 'Як дістатися до кабінету остеопата OsteoJump у Варшаві. Адреса, карта, маршрут громадським транспортом та автомобілем.',
      ogTitle: 'Як дістатися — OsteoJump',
      ogDescription: 'Адреса кабінету, карта, маршрут. Варшава, район Ursus.',
    },
    de: {
      description: 'Anfahrt zur osteopathischen Praxis OsteoJump in Warschau. Adresse, Karte, Anreise mit öffentlichen Verkehrsmitteln und Auto.',
      ogTitle: 'Anfahrt — OsteoJump',
      ogDescription: 'Praxisadresse, Karte, Anreise. Warschau, Bezirk Ursus.',
    },
  },

  contacts: {
    pl: {
      description: 'Kontakt z osteopatą Hanną Bykavą. Telefon, e-mail, Telegram, WhatsApp. Umów wizytę w gabinecie w Warszawie.',
      ogTitle: 'Kontakt — OsteoJump',
      ogDescription: 'Telefon, e-mail, Telegram, WhatsApp. Umów wizytę w Warszawie.',
    },
    en: {
      description: 'Contact osteopath Hanna Bykava. Phone, email, Telegram, WhatsApp. Book an appointment at the Warsaw practice.',
      ogTitle: 'Contacts — OsteoJump',
      ogDescription: 'Phone, email, Telegram, WhatsApp. Book an appointment in Warsaw.',
    },
    ru: {
      description: 'Связаться с остеопатом Анной Быковой. Телефон, email, Telegram, WhatsApp. Запись на прием в кабинет в Варшаве.',
      ogTitle: 'Контакты — OsteoJump',
      ogDescription: 'Телефон, email, Telegram, WhatsApp. Запись на прием в Варшаве.',
    },
    uk: {
      description: 'Зв\'язатися з остеопатом Анною Биковою. Телефон, email, Telegram, WhatsApp. Запис на прийом у кабінет у Варшаві.',
      ogTitle: 'Контакти — OsteoJump',
      ogDescription: 'Телефон, email, Telegram, WhatsApp. Запис на прийом у Варшаві.',
    },
    de: {
      description: 'Kontakt zur Osteopathin Hanna Bykava. Telefon, E-Mail, Telegram, WhatsApp. Termin in der Warschauer Praxis buchen.',
      ogTitle: 'Kontakt — OsteoJump',
      ogDescription: 'Telefon, E-Mail, Telegram, WhatsApp. Termin in Warschau buchen.',
    },
  },

  osteopathy: {
    pl: {
      description: 'Czym jest osteopatia. Zasady pracy osteopaty, diagnostyka i leczenie. OsteoJump — osteopata w Warszawie.',
      ogTitle: 'Czym jest osteopatia — OsteoJump',
      ogDescription: 'Zasady pracy osteopaty, diagnostyka i leczenie.',
    },
    en: {
      description: 'What is osteopathy. Principles of osteopathic work, diagnostics and treatment. OsteoJump — osteopath in Warsaw.',
      ogTitle: 'What is Osteopathy — OsteoJump',
      ogDescription: 'Principles of osteopathic work, diagnostics and treatment.',
    },
    ru: {
      description: 'Что такое остеопатия. Принципы работы остеопата, диагностика и лечение. OsteoJump — остеопат в Варшаве.',
      ogTitle: 'Что такое остеопатия — OsteoJump',
      ogDescription: 'Принципы работы остеопата, диагностика и лечение.',
    },
    uk: {
      description: 'Що таке остеопатія. Принципи роботи остеопата, діагностика та лікування. OsteoJump — остеопат у Варшаві.',
      ogTitle: 'Що таке остеопатія — OsteoJump',
      ogDescription: 'Принципи роботи остеопата, діагностика та лікування.',
    },
    de: {
      description: 'Was ist Osteopathie. Grundsätze der osteopathischen Arbeit, Diagnostik und Behandlung. OsteoJump — Osteopathin in Warschau.',
      ogTitle: 'Was ist Osteopathie — OsteoJump',
      ogDescription: 'Grundsätze der osteopathischen Arbeit, Diagnostik und Behandlung.',
    },
  },

  consultation: {
    pl: {
      description: 'Konsultacja online z osteopatą. Omówienie problemu, zalecenia i plan leczenia. Wygodna forma kontaktu z OsteoJump.',
      ogTitle: 'Konsultacja online — OsteoJump',
      ogDescription: 'Konsultacja online z osteopatą. Omówienie problemu, zalecenia i plan leczenia.',
    },
    en: {
      description: 'Online consultation with an osteopath. Problem discussion, recommendations and treatment plan. Convenient way to contact OsteoJump.',
      ogTitle: 'Online Consultation — OsteoJump',
      ogDescription: 'Online consultation with an osteopath. Problem discussion, recommendations and treatment plan.',
    },
    ru: {
      description: 'Онлайн-консультация с остеопатом. Обсуждение проблемы, рекомендации и план лечения. Удобная форма связи с OsteoJump.',
      ogTitle: 'Онлайн-консультация — OsteoJump',
      ogDescription: 'Онлайн-консультация с остеопатом. Обсуждение проблемы, рекомендации и план лечения.',
    },
    uk: {
      description: 'Онлайн-консультація з остеопатом. Обговорення проблеми, рекомендації та план лікування. Зручна форма зв\'язку з OsteoJump.',
      ogTitle: 'Онлайн-консультація — OsteoJump',
      ogDescription: 'Онлайн-консультація з остеопатом. Обговорення проблеми, рекомендації та план лікування.',
    },
    de: {
      description: 'Online-Beratung mit einer Osteopathin. Problemdiskussion, Empfehlungen und Behandlungsplan. Bequeme Kontaktform mit OsteoJump.',
      ogTitle: 'Online-Beratung — OsteoJump',
      ogDescription: 'Online-Beratung mit einer Osteopathin. Problemdiskussion, Empfehlungen und Behandlungsplan.',
    },
  },

  appointment: {
    pl: {
      description: 'Jak przebiega wizyta u osteopaty. Etapy: rozmowa, diagnostyka, praca z ciałem. Łagodne techniki, indywidualne podejście.',
      ogTitle: 'Jak przebiega wizyta — OsteoJump',
      ogDescription: 'Etapy wizyty: rozmowa, diagnostyka, praca z ciałem.',
    },
    en: {
      description: 'How an osteopathic appointment works. Stages: conversation, diagnostics, bodywork. Gentle techniques, individual approach.',
      ogTitle: 'How a Session Works — OsteoJump',
      ogDescription: 'Appointment stages: conversation, diagnostics, bodywork.',
    },
    ru: {
      description: 'Как проходит прием у остеопата. Этапы: беседа, диагностика, работа с телом. Мягкие техники, индивидуальный подход.',
      ogTitle: 'Как проходит приём — OsteoJump',
      ogDescription: 'Этапы приёма: беседа, диагностика, работа с телом.',
    },
    uk: {
      description: 'Як проходить прийом у остеопата. Етапи: бесіда, діагностика, робота з тілом. М\'які техніки, індивідуальний підхід.',
      ogTitle: 'Як проходить прийом — OsteoJump',
      ogDescription: 'Етапи прийому: бесіда, діагностика, робота з тілом.',
    },
    de: {
      description: 'Wie ein osteopathischer Termin abläuft. Phasen: Gespräch, Diagnostik, Körperarbeit. Sanfte Techniken, individueller Ansatz.',
      ogTitle: 'Wie ein Termin abläuft — OsteoJump',
      ogDescription: 'Terminablauf: Gespräch, Diagnostik, Körperarbeit.',
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
