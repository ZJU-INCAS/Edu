import React from 'react'
import { IResource } from '@edu'
import Item from './item'
export default class extends React.Component<{ list: Array<any>, callback:()=>void }> {
  render(){
    return this.props.list.map(item => <Item data={item} callback={this.props.callback}/>)
  }
}
