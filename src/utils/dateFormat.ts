import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export const dateFormat = (date: Date, hasYear?: boolean) => {
  const day = new Date(date)
  return hasYear
    ? format(date, 'yyyy年M月d日(E)', { locale: ja })
    : format(date, 'M月d日(E)', { locale: ja })
}

export const timeFormat = (date: Date) =>
  format(date, 'kk時mm分ss秒', { locale: ja })

export const datetimeFormat = (date: Date, hasYear?: boolean) =>
  hasYear
    ? format(date, 'yyyy年M月d日(E) kk時mm分ss秒', { locale: ja })
    : format(date, 'M月d日(E) kk時mm分ss秒', { locale: ja })
