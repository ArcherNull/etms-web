/*
 * @Author: Null
 * @Date: 2022-03-09 09:54:31
 * @Description: i18n 国际化语言入口文件
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import setting from '@/setting'

Vue.use(VueI18n)

function loadLocaleMessages () {
  // 匹配后缀名为 .json 的文件
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  for (const key of locales.keys()) {
  // 匹配后缀名为 . 的文件
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const localeElementUI = require(`element-ui/lib/locale/lang/${locales(key)._element}`)
      messages[locale] = {
        ...locales(key),
        ...localeElementUI ? localeElementUI.default : {}
      }
    }
  }
  return messages
}

// 加载语言文件
const messages = loadLocaleMessages()

export const languages = Object.keys(messages).map(langlage => ({
  label: messages[langlage]._name,
  value: langlage
}))

setting.languages = languages

const i18n = new VueI18n({
  locale: setting.defaultLanguage,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE, // 备用语言
  messages
})

export default i18n
