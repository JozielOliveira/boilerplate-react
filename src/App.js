import React, { PureComponent, Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CircularProgress } from '@material-ui/core'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'
// Central router
import { routes/*, navRoutes*/ } from './router'
// Theme Global Variables
import theme from './theme'

// import { NavBarComponent } from './components'

const history = createBrowserHistory()

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            {/* <NavBarComponent pages={navRoutes} history={history} /> */}
            <div style={styles.container}>
              <Suspense fallback={<CircularProgress size={100} />}>
                <Switch>
                  {routes.map((prop, key) => (
                    <Route
                      path={prop.path}
                      key={key}
                      component={prop.component}
                      {...prop}
                    />
                  ))}
                </Switch>
              </Suspense>
            </div>
          </Router>
        </ThemeProvider>
        {/** Alert Global */}
        {/* <Alert /> */}
      </Provider>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '80%',
    margin: '56px 0px',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
