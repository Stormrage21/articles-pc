const Key = 'pc-key'

const getToken = () => {
  return localStorage.getItem(Key)
}
const setToken = token => { return localStorage.setItem(Key, token) }
const clearToken = () => { return localStorage.removeItem(Key) }

export { getToken, setToken, clearToken }