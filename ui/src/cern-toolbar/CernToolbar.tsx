import React, { ReactElement, FunctionComponent } from 'react'
import './CernToolbar.css'
import { useTranslation } from 'react-i18next'

interface CernToolbarProps {
  isLoggedIn: boolean,
  username?: string,
  name?: string,
  isVerified?: boolean,
  isExternal?: boolean,
  isMultiFactor?: boolean,
  authProvider?: string,
  loginAction?: CernToolbarAction,
  logoutAction?: CernToolbarAction, 
}

export type CernToolbarAction = () => void


const CernToolbar:FunctionComponent<CernToolbarProps> =
({ isLoggedIn, username = '', name = '', isVerified = true, isExternal = false, 
   isMultiFactor = false, authProvider = 'CERN', loginAction = () => {}, logoutAction = () => {} }) => {

  const { t } = useTranslation('cernToolbar')

  function login(event: React.MouseEvent<HTMLElement>) {
    loginAction()
    event.preventDefault()
  }

  function logout(event: React.MouseEvent<HTMLElement>) {
    logoutAction()
    event.preventDefault()
  }

  const loginElement:ReactElement = (
    <a className="cern-account" href="#top"
       title={ t('signIn.title') } onClick={ login }>
     { t('signIn') }
   </a>
  )
  const verifiedLoggedInElement:ReactElement = (
    <>
      <span>
        { t('signedInAs') }
        <a className="account" href="http://cern.ch/account"
           title={ isExternal ? t('verifiedExternal.title') : 
                   t((isMultiFactor ? 'verifiedMultifactor.title' : 'verified.title'), { name, username }) }>
          { username + (isExternal ? '' : ' (CERN)') }
        </a>
        &nbsp;
      </span>
      <a className="cern-signout" href="#top"
         title={ t('signOut.title') }
         onClick={ logout }>
        { t('signOut') }
      </a>
    </>
  )
  const unverifiedLoggedInElement:ReactElement = (
    <>
      <span>
        { t('signedInAs') }{ username } ({ authProvider })&nbsp;
      </span>
      <a className="cern-signout" href="#top"
         title={ t('signOut.title') }
         onClick={ logout }>
        { t('signOut') }
      </a>
    </>
  )

  return (
    <div className="cern-toolbar" id="top">

      <h1>
        <a href="http://home.cern" title="CERN">
          CERN <span>{t('accelerating')}</span>
        </a>
      </h1>

      <ul className={ isLoggedIn ? 'cern-signedin' : '' }>
        <li className={ 'cern-accountlinks' + (isMultiFactor ? ' cern-multifactor' : '')}>
          { isLoggedIn ? (isVerified ? verifiedLoggedInElement : unverifiedLoggedInElement) : loginElement }
        </li>
        <li>
          <a className="cern-directory"
            href="http://cern.ch/directory"
            title={ t('directory.title')}>
            { t('directory') }
          </a>
        </li>
      </ul>

	  </div>
  )
}

export default CernToolbar