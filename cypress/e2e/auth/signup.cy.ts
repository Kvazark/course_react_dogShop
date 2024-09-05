/// <reference types="cypress" />

import { SIGN_UP_FORM_SETTINGS } from '../../../src/components/forms/SignupForm/helpers/constants';

describe('Регистрация нового пользователя', () => {
	beforeEach(() => {
		cy.visit('/signup');
	});

	it('Проверяем, что попали на страницу регистрации', () => {
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.FORM_TITLE}]`).should(
			'contain',
			'Регистрация'
		);
	});

	it('Пробуем отправить пустую форму', () => {
		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.EMAIL}]`)
			.contains(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
			.should('not.exist');

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}]`)
			.contains(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MAX)
			.should('not.exist');

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}]`)
			.contains(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN)
			.should('not.exist');

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}]`)
			.contains(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.REQUIRED)
			.should('not.exist');

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.SUBMIT_BTN}]`)
			.should('be.enabled')
			.click()
			.should('be.disabled');

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.EMAIL}`).contains(
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL
		);

		cy.get(`[data-testid=${SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}`).contains(
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN
		);
	});
});
