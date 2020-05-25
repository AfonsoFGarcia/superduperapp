import React, { FunctionComponent } from 'react'
import { AppBar, Toolbar, Button, Menu, MenuItem, makeStyles } from '@material-ui/core'
import { Translate, ExpandMore } from '@material-ui/icons'
import i18n from '../translation/i18n'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}))

const Header: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [ anchorLanguageMenu, setAnchorLanguageMenu ] = React.useState<null | HTMLElement>(null)

  const openLanguageMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorLanguageMenu(event.currentTarget)

  const changeLanguage = (event: React.MouseEvent<HTMLElement>) => {
    closeLanguageMenu()
    i18n.changeLanguage(event.currentTarget.id)
  }

  const closeLanguageMenu = () => setAnchorLanguageMenu(null)

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Button component={ Link } to="/" color="inherit">
            { t('app.name') }
          </Button>
        </div>
        <Button aria-controls="language-menu" aria-haspopup="true" onClick={ openLanguageMenu }
                startIcon={ <Translate /> } endIcon={ <ExpandMore /> } color="inherit">
          { t('app.language') }
        </Button>
        <Menu id="language-menu" anchorEl={ anchorLanguageMenu } keepMounted 
              open={ Boolean(anchorLanguageMenu) } onClose={ closeLanguageMenu }>
          <MenuItem onClick={ changeLanguage } id="en">{ t('language.en') }</MenuItem>
          <MenuItem onClick={ changeLanguage } id="pt">{ t('language.pt') }</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header