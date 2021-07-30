/**
 * Két lib van, ami nem működött még júli 30-án 2021-ben:
 *  Az itt leírt https://marmicode.io/blog/testing-angular-components-using-cypress
 *  - https://github.com/testing-library/jest-dom
 *  másik meg a "hivatalos" a cpyress oldalán is behivatkozva https://medium.com/joolsoftware/unittesting-angular-components-with-cypress-202a38d9f81a 
 *  - https://github.com/bahmutov/cypress-angular-unit-test/
 *  
 *  
 *  Mindkettő szar. De arra jó, hogy legalább csináltam egy "saját" megoldást arra, hogy hogyan lehet amúgy
 *  sima cypre-ssel elkérni angular instance-okat, ha majd esetleg e2e-ben ilyesmire fanyalodnánk.
 *  
 *  Maradjon meg a tudásbázisomban
 */


/**
 * "Vanilla" Cypress-ből kihákolt Angular Instance tesztelés:
 */
const { AppComponent } = require('../../../src/app/app.component');

function getComponentBySelectorName(doc, angular, name) {
  let domElement = doc.querySelector(name);
  expect(domElement).to.exist;
  const componentInstance = angular
    .getComponent(domElement);
  expect(componentInstance).to.exist;
  cy.log('Angular component captured');
  return componentInstance;
}

describe('Angular App Smoke tests', () => {

  // comnponensek esetén -> ÉRDEMES beilleszteni a valós angular környezetbe
  it('Should render root component, should have a basic component value initialized', () => {
    cy.visit('/');   // elndul a TELJES Angular app
    let angular;
    cy.window()
      .then((win) => angular = win.ng)  // elkérjük az angular app-ot
      .then(() => {
        return cy.document();
      })
      .then((doc) => {
        const componentInstance = getComponentBySelectorName(doc, angular, 'app-root');
        // abngular app-ból kikérdezzük az "app-root" instance
        expect(componentInstance.title);
        expect(componentInstance.title).to.equal('atr-web-app');
        cy.get('app-title-tab').to.equal(componentInstance.title);
      });
  });

  // service
  // + componens-ekben lévő segédfüggvények
  it('közvetlen test', () => {
    let testComp = new AppComponent();
    expect(testComp.returnketto()).to.equal(2)
    expect(testComp.title).to.equal('atr-web-app')
  })
});

