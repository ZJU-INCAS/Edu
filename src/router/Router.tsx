import React from 'react'
// https://reach.tech/router/api/Router
import { Router, RouteComponentProps, WindowLocation } from '@reach/router'

import Home from '@/pages/Home'
import Resource from '@/pages/Resource'

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
    <Route path='/resource' component={Resource} />
  </Router>
)

export default React.memo(({ location }: ILocation) => <MyRouter location={location} />)
