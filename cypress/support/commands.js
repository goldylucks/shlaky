// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/*
 * Exposed API
 */

Cypress.Commands.add('signup', signup)
Cypress.Commands.add('topBarVisible', topBarVisible)
Cypress.Commands.add('containsMany', containsMany)
Cypress.Commands.add('getPartialClass', getPartialClass)
Cypress.Commands.add('pathnameIs', pathnameIs)
Cypress.Commands.add('logout', logout)

/*
 * API Implementations
 */

function signup() {
  const name = global.randomUserName()
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/users',
    body: {
      name,
    },
  }).then(resp => {
    window.localStorage.setItem('user', JSON.stringify(resp.body))
  })
}

function topBarVisible() {
  return getTopBar().should('not.be.visible')
}

function getTopBar() {
  return getPartialClass('TopBar')
}

function containsMany(args) {
  args.forEach(arg => cy.contains(String(arg)))
}

function getPartialClass(str) {
  return cy.get(`[class*=${str}]`)
}
function pathnameIs(pathname) {
  cy.location('pathname').should('eq', pathname)
}

function logout() {
  cy.clearLocalStorage('user')
}
