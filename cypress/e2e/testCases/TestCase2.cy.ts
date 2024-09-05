/// <reference types="cypress" />

import { SIGN_UP_FORM_SETTINGS } from '../../../src/components/forms/SignupForm/helpers/constants';

///Возможно словаить 499 ошибку, перед тестом нужно выключить антивирус
describe('Authorization', () => {
	const invalidCredentials = {
		email: 'invalid@example.com',
		password: 'wrongpassword',
	};

	const validCredentials = {
		email: 'moderator@example.com',
		password: 'Password',
	};

	it('Negative case: Login with invalid credentials', () => {
		cy.visit('/signIn');
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.EMAIL}]`).type(
			invalidCredentials.email
		);
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}]`).type(
			invalidCredentials.password
		);
		cy.get(
			`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.SUBMIT_BTN}]`
		).click();
	});

	it('Positive case: Login with valid credentials', () => {
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
		cy.visit('/profile').wait(2000);
		cy.get('[data-testid="btn-logout"]').click();
		cy.url().should('include', '/');
	});
});
