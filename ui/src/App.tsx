import React, { useMemo } from 'react'
import CernToolbar from './cern-toolbar/CernToolbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoggedInState } from './reducers/user'
import PrivateRoute from './routes/PrivateRoute'
import Header from './components/Header'
import { ThemeProvider, useMediaQuery, createMuiTheme, Box, CssBaseline, Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import UserAccount from './components/UserAccount'

function App() {
  const loginState:LoggedInState = useSelector((state: LoggedInState) => state)

  function logout() {
    loginState.keycloak?.logout()
  }

  function login() {
    loginState.keycloak?.login()
  }

  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(() => createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            light: '#525cd2',
            main: '#0033a0',
            dark: '#001070',
            contrastText: '#ffffff',
          },
          secondary: {
            light: '#d59b3a',
            main: '#a06d00',
            dark: '#6d4200',
            contrastText: '#ffffff',
          },
        },
      }),
    [prefersDarkMode],
  )
  
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <CernToolbar isLoggedIn={ loginState.loggedIn } username={ loginState.username } 
                  name={ loginState.name } loginAction={ login } logoutAction={ logout } />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <Box mt={5} mx={2}>
            <Switch>
              <PrivateRoute path="/private">
                <UserAccount />
              </PrivateRoute>
              <Route exact path="/">
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Typography variant="h3" align="center">
                      { t('welcome.header') }
                    </Typography>
                  </Grid>
                </Route>
            </Switch>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
