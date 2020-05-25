import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak, { KeycloakInstance, KeycloakProfile } from 'keycloak-js'
import store, { logIn, logOut } from './reducers/user'
import { Provider } from 'react-redux';

const keycloak:KeycloakInstance = Keycloak({
  realm: "CERN",
  url: "http://keycloak-127-0-0-1.nip.io/auth/",
  clientId: "react",
})

keycloak.init({
  onLoad: 'check-sso',
}).then((authenticated:boolean) => {
  if (authenticated) {
    keycloak.loadUserProfile().then((profile:KeycloakProfile) => {
      store.dispatch(logIn(keycloak, profile.username, profile.firstName + ' ' + profile.lastName))
    })
  } else {
    store.dispatch(logOut(keycloak))
  }
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
