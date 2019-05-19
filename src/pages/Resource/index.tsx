import React from 'react'
import useFetcher from '@/hooks/useFetcher'
import { getResources } from '@/services/resource'
import List from './list'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export default () => {
  const [resources] = useFetcher(() => getResources())
  return resources ? <Center><List list={resources} /></Center> : null
}
