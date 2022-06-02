import { CONTRACTS } from './contracts'
const { MEVMOS, MUSDC, MATOM } = CONTRACTS

describe('Remove Liquidity', () => {
  it('Native remove', () => {
    cy.visit(`/remove/v2/EVMOS/${MUSDC}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'EVMOS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MUSDC')
  })

  it('Native remove swap order', () => {
    cy.visit(`/remove/v2/${MUSDC}/EVMOS`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MUSDC')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'EVMOS')
  })

  it('loads the two correct tokens', () => {
    cy.visit(`/remove/v2/${MUSDC}/${MATOM}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MUSDC')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MATOM')
  })

  it('does not crash if WEVMOS is duplicated', () => {
    cy.visit(`/remove/v2/${MEVMOS}/${MEVMOS}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'MEVMOS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MEVMOS')
  })

  it('does not crash if EVMOS is duplicated', () => {
    cy.visit(`/remove/v2/EVMOS/EVMOS`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'EVMOS')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'EVMOS')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/remove/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'SKL')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })
})
