import { GET, POST, PUT } from '@/utils/fetch'
import { IResource } from '@edu'
import host from '@/config/host'
import { getAccessToken } from '@/utils/logIn'
export async function getResources(type:string) {
  let t = ''
  switch(type){
    case '0': t = 'user'
    break
    case '1': t = 'agency'
    break
    case '2': t = 'admin'
  }
  return GET<{ message: string, status: number, data: IResource[] }>(`${t}/resourcelist`).then(res => Promise.resolve(res.map(r => r.data)))
}

export async function downloadResource(id: string) {
  //return GET(`agency/download/${id}`)
  window.open(`${host.api}/agency/download/${id}`)
}

export async function uploadResource(params: any) {
  const { fileTitle, fileContentType, fileDescription, fileInitialProvider, fileKeyWord, fileOwnerShipPrice, fileReadPrice, fileImage, file } = params
  console.log(file)
  const formdata = new FormData()
  const headers = new Headers()
  const accessToken = await getAccessToken()
  if (accessToken) {
    headers.append('Authorization', accessToken)
  }
  headers.append('Content-Type', 'multipart/form-data')
  formdata.append('contentType', 'multipart/form-data')
  formdata.append('file', file, file.name)
  return fetch(`${host.api}/agency/upload?fileContentType=${fileContentType}&fileTitle=${fileTitle}&fileDescription=${fileDescription}&fileInitialProvider=${fileInitialProvider}&fileKeyWord=${fileKeyWord}&fileOwnerShipPrice=${fileOwnerShipPrice}&fileReadPrice=${fileReadPrice}&fileImage=${fileImage}`, { method: "post", headers, body: formdata })
}
