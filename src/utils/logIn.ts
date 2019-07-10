import { Try, Success, Failure } from './fp/Try'
import { FetchError, encodeParams, GET, POST } from './fetch'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage'

export async function getAccessToken(){
  return getLocalStorage('access_token')
}

export async function logIn(email:string, password:string, type: string){
  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  let t = ''
  switch(type){
    case '0': t = 'user'
    break
    case '1': t = 'agency'
    break
    case '2': t = 'admin'
  }

  const data = await POST(`login/${t}?email=${email}&password=${password}`,{headers})
  data.map((d:any)=>{
    if(d.status===0){
      const token = d.data
      setLocalStorage('user_type', type)
      setLocalStorage('access_token', token)
    }
  })
  return data
}
export function isLogIn() {
  return !!getLocalStorage('access_token')
}
export function logOut() {
  removeLocalStorage('user_type')
  removeLocalStorage('access_token')
}
