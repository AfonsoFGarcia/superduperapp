import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { LoggedInState } from '../reducers/user'
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom'

export interface LocationProps {
  location: string,
  path: string,
}

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const state = useSelector((state: LoggedInState) => state)
  
  return (
    <Route
      { ...rest }
      render={ (props:RouteComponentProps<LocationProps>) =>
        state.loggedIn ? (
          children
        ) :  (
          state.keycloak?.login()
        )
      }
    />  
  )
}

export default PrivateRoute