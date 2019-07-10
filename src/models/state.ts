import { Model } from '@/hooks/useModel'
import { IUser } from '@edu'
import { getLocalStorage } from '@/utils/storage'
import { logIn, isLogIn,logOut } from '@/utils/logIn'
import {getMyInfo} from '@/services/user'
interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IUser | null
  type: string
}


class UserModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: isLogIn(),
      myInfo: null,
      type: `${getLocalStorage('user_type')}` || '0'
    }

    this.FRESH_INFO()
  }

  LOG_IN = async (username: string, password: string, type: string) => {
    const token = await logIn(username, password, type)
    this.setState({type})

    token.fail().succeed((_: any) => {
      if(_.status === 0 ){
        this.setState({
          isLogIn: true,
        })
        this.FRESH_INFO()
      }
    })

    return token
  }

  LOG_OUT = () => {
    logOut()

    this.setState({
      isLogIn: false,
      myInfo: null,
    })
  }

  FRESH_INFO = async () => {
    if (!this.state.isLogIn) {
      return
    }

    const res = await getMyInfo(this.state.type)
    const that = this
    res.map(r=>that.setState({
      myInfo: r.data
    }))
  }
}

export default new UserModel()

