import React from 'react'
// https://reach.tech/router/api/Router
import { Router, RouteComponentProps, WindowLocation } from '@reach/router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Resource from '@/pages/Resource'
import MyResource from '@/pages/MyResource'
import Upload from '@/pages/Upload'
import VerifyList from '@/pages/Verify'

export const Route: React.FC<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    component: any
    // component: React.FC<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

export interface ILocation {
  location: WindowLocation
}

const MyRouter: React.FC<ILocation> = ({ location }) => (
  <Router location={location}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path='/resource' component={Resource} />
    <Route path='/myResource' component={MyResource} />
    <Route path='/upload' component={Upload} />
    <Route path='/verifyList' component={VerifyList} />
  </Router>
)

export default React.memo(({ location }: ILocation) => <MyRouter location={location} />)
