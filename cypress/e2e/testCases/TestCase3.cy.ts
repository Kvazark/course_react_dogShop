/// <reference types="cypress" />

import { SIGN_UP_FORM_SETTINGS } from '../../../src/components/forms/SignupForm/helpers/constants';

///Возможно словаить 499 ошибку, перед тестом нужно выключить антивирус
describe('TestCase_3', () => {
	const validCredentials = {
		email: 'moderator@example.com',
		password: 'Password',
	};

	before(() => {
		cy.visit('/signIn');
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.EMAIL}]`).type(
			validCredentials.email
		);
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}]`).type(
			validCredentials.password
		);
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.SUBMIT_BTN}]`)
			.click()
			.wait(2000);
	});

	it('Like and unlike products', () => {
		cy.visit('/catalog').wait(2000);
		cy.get('[data-testid="like-btn"]').eq(2).click();
		cy.get('[data-testid="like-btn"]').eq(5).click();

		// Verify that the likes are present
		cy.get('[data-testid="like-btn"]').eq(2).should('have.class', 'liked');
		cy.get('[data-testid="like-btn"]').eq(5).should('have.class', 'liked');

		// Unlike
		cy.get('[data-testid="like-btn"]').eq(2).click();
		cy.get('[data-testid="like-btn"]').eq(5).click();

		// Verify that the likes are removed
		cy.get('[data-testid="like-btn"]').eq(2).should('not.have.class', 'liked');
		cy.get('[data-testid="like-btn"]').eq(5).should('not.have.class', 'liked');
	});
});
