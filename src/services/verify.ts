import { GET, POST, PUT } from '@/utils/fetch'
import host from '@/config/host'

export async function getVerifyList(){
  return await GET('admin/resourcelistW').then(res => Promise.resolve(res.map((r:any) => r.data)))
}

export async function acceptResource(id: string) {
  return await GET(`admin/serviceY?id=${id}`)
}

export async function refuseResource(id: string) {
  return await GET(`admin/serviceR?id=${id}`)
}
