import { createStore } from "redux"
import { KeycloakInstance } from "keycloak-js"

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export interface LoggedInState {
  keycloak: KeycloakInstance | undefined,
  loggedIn: boolean,
  username?: string,
  name?: string,
}

export interface ChangeLoggedInStateAction {
  type: string,
  keycloak: KeycloakInstance | undefined,
  username?: string,
  name?: string,
}

export function logIn(keycloak: KeycloakInstance | undefined, username?: string, name?: string): ChangeLoggedInStateAction {
  return {
    type: LOG_IN,
    keycloak: keycloak,
    username: username,
    name: name
  }
}

export function logOut(keycloak: KeycloakInstance | undefined): ChangeLoggedInStateAction {
  return {
    keycloak: keycloak,
    type: LOG_OUT,
  }
}

const initialState: LoggedInState = {
  keycloak: undefined,
  loggedIn: false,
}

export function logInReducer(state: LoggedInState = initialState, action: ChangeLoggedInStateAction): LoggedInState {
  switch (action.type) {
    case LOG_IN: {
      return {
        keycloak: action.keycloak,
        loggedIn: true,
        username: action.username,
        name: action.name,
      }
    }
    case LOG_OUT: {
      return {
        keycloak: action.keycloak,
        loggedIn: false,
      }
    }
    default: return state
  }
}

export default createStore(logInReducer)