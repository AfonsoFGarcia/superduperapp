import React, { FunctionComponent, useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { LoggedInState } from '../reducers/user'
import { useTranslation } from 'react-i18next'
import axios, { AxiosResponse } from 'axios'

interface UserAccountProps {

}

const UserAccount: FunctionComponent<UserAccountProps> = () => {
  const state = useSelector((state: LoggedInState) => state)
  const [ apiText, setApiText ] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    const token = state.keycloak?.token
    axios.get('/api/test/hello', {
      headers: { "Authorization" : `Bearer ${token}`}
    })
      .then((res: AxiosResponse<string>) => setApiText(res.data))
  }, [apiText, state.keycloak])

  return (
    <>
      <Typography variant="h4">
        { t('private.header', { name: state.name }) }
      </Typography>
      <Typography>
        { apiText }
      </Typography>
    </>
  )
}

export default UserAccount