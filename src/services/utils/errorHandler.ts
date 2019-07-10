import { FetchError } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'

export function loginHandler(err?: FetchError) {
  snackbar.error('登录失败')
}
