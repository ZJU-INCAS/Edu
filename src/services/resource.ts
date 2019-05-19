import { GET, POST, PUT } from '@/utils/fetch'
import { IResource } from '@edu'
export async function getResources() {
  return GET<{ message: string, status: number, data: IResource[] }>('admin/resourcelist').then(res => Promise.resolve(res.map(r => r.data)))
}
