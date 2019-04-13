import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ThemeProvider } from '@material-ui/styles'

import { getTheme } from '@/theme'

import Router from '@/router'

const App = () => (
    <Router />
)

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <ThemeProvider theme={getTheme(theme, mode)}>
      <App />
    </ThemeProvider>
  )
}

export default Root
