import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function getMyInfo(type: string) {
  let t = ''
  switch(type){
    case '0': t = 'user'
    break
    case '1': t = 'agency'
    break
    case '2': t = 'admin'
  }
  return GET<{ message: string, status: number, data: IUser }>(`${t}/detail`)
}

export async function recharge(value: number) {
  return await  POST(`user/recharge?balance=${value}`)
}
