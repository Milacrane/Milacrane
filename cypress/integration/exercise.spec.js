/// <reference types="cypress" />

const sizes = [
    'iphone-6',
    'ipad-2', [1024, 768],
    [1680, 1020]
]

describe('React home page url check', () => {
    it('home page is loading', () => {
        cy.visit('http://localhost:3000/');
    });
    it(`home page url is localhost:3000`, () => {
        cy.location().should((loc) => {
            expect(loc.host).to.eq('localhost:3000')
        })
    });
    it(`home page port is 3000`, () => {
        cy.location().should((loc) => {
            expect(loc.port).to.eq('3000')
        })
    });
    it(`home page protocol is http`, () => {
        cy.location().should((loc) => {
            expect(loc.protocol).to.eq('http:')
        })
    });
})
describe('React home page content check', () => {
    sizes.forEach((size) => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/');
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }
        });
        it(`Image is visible and image name includes logo on size: ${size}`, () => {
            cy.get('.App-logo')
                .should('have.attr', 'src')
                .should('include', 'logo')
        });

        it(`Paragrpaph is visible and text is Edit src/App.js and save to reload on size: ${size}`, () => {
            cy.get('p')
                .should('be.visible')
                .should('have.text', 'Edit src/App.js and save to reload.');
        });

        it(`Link is visible and text is Edit src/App.js and save to reload on size: ${size}`, () => {
            cy.get('.App-link')
                .should('be.visible')
                .should('have.attr', 'href')
                .should('eq', 'https://reactjs.org')
        });
    })
})