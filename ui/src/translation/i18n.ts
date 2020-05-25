import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cernToolbar_en from './CernToolbarI18n.json'

const resources = {
  en: {
    translation: {
      'app.name': 'My CERN Visits',
      'app.language': 'Language',
      'language.en': 'English',
      'language.pt': 'Portuguese',
      'private.header': 'Hello {{name}}!',
      'welcome.header': 'Welcome to My CERN Visits'
    },
    cernToolbar: cernToolbar_en
  },
  pt: {
    translation: {
      'app.language': 'Língua',
      'language.en': 'Inglês',
      'language.pt': 'Português',
      'private.header': 'Olá {{name}}!',
      'welcome.header': 'Bem vindo a My CERN Visits'
    }
  }
}

i18n.use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      keySeparator: false,
      interpolation: {
        escapeValue: false
      }
    })

export default i18n