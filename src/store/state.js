
let defaultsinger = {}
try {
  if (localStorage.getItem('singer')) {
    defaultsinger = JSON.parse(localStorage.getItem('singer'))
  }
} catch (e) { }
export default {
  singer: defaultsinger
}
