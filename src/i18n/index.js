import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

const messages = {
  en: {
    msg: { ...mEnLocale }
  },
  zh: {
    msg: { ...mZhLocale }
  }
}

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
