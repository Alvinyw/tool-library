import Cookies from 'js-cookie'
// Cookies.get("aa")
// Cookies.set("aa", this.ifRemeberPsw, {
//   expires: 30
// });
// Cookies.remove("aa");

const currentMenuIndex = 'currentMenuIndex'
const currentRouteName = 'currentRouteName'

export function getCurrentMenuIndex() {
  return (Cookies.get(currentMenuIndex))
}
export function setCurrentMenuIndex(val) {
  return Cookies.set(currentMenuIndex, val)
}
export function removeCurrentMenuIndex() {
  return Cookies.remove(currentMenuIndex)
}
export function getCurrentRouteName() {
  return (Cookies.get(currentRouteName))
}
export function setCurrentRouteName(val) {
  return Cookies.set(currentRouteName, val)
}
export function removeCurrentRouteName() {
  return Cookies.remove(currentRouteName)
}

