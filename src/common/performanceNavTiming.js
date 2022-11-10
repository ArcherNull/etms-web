/*
 * @Author: Null
 * @Date: 2022-04-26 13:57:28
 * @Description: 展示navigation对象信息
 */

export function showNavigationDetails () {
  const [entry] = performance.getEntriesByType('navigation')
  console.table(entry.toJSON())
}

