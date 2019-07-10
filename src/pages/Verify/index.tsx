import React, { useEffect } from 'react'
import useFetcher from '@/hooks/useFetcher'
import { getVerifyList } from '@/services/verify'
import List from './list'
import styled from 'styled-components'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export default () => {
  const { isLogIn, type } = useModel(stateModel, ['isLogIn', 'type'])
  const [list, setList] = React.useState<Array<any>>([])

  const getList = async () => {
    const res =  await getVerifyList()
    res.map((l:any)=>{
      setList(l)
    })
  }

  useEffect(()=>{
    getList()
  }, [])
  return list ? <Center><List list={list} callback={getList}/></Center> : null
}
