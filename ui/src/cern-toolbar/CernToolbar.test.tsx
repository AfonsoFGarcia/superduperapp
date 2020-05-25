import React from 'react'
import { render } from '@testing-library/react'
import CernToolbar  from './CernToolbar'

test('Renders username after login', () => {
  const { getByText } = render(<CernToolbar isLoggedIn={true} username="afalardo" name="Afonso Garcia" />)

  const accountElement = getByText(/afalardo \(CERN\)/i)
  expect(accountElement).toBeInTheDocument()
  expect(accountElement).toBeInstanceOf(HTMLAnchorElement)
  expect(accountElement.title).toBe('Signed in as Afonso Garcia (afalardo)')

})