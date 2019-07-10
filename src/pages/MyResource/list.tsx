import React from 'react'
import { IResource } from '@edu'
import Item from './item'
export default class extends React.Component<{ list: IResource[] }> {
  render(){
    return this.props.list.map(item => <Item data={item} />)
  }
}
