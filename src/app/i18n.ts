import i18n from 'i18next'
import ICU from 'i18next-icu'
import { initReactI18next } from 'react-i18next'

import resources from '../locales'

i18n
  .use(initReactI18next)
  .use(ICU)
  .init({
    resources,
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
