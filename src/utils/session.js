
const userInfo = 'userInfo'

// 产品信息 logo， color
export function getUserInfo() {
  return sessionStorage.getItem(userInfo) ? JSON.parse(sessionStorage.getItem(userInfo)) : {}
}
export function setUserInfo(val) {
  return sessionStorage.setItem(userInfo, JSON.stringify(val))
}
export function removeUserInfo() {
  sessionStorage.removeItem(userInfo)
}


export function clearSessionData() {
  sessionStorage.clear()
}