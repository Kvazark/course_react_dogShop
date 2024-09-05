/// <reference types="cypress" />

import { SIGN_UP_FORM_SETTINGS } from '../../../src/components/forms/SignupForm/helpers/constants';

///Возможно словаить 499 ошибку, перед тестом нужно выключить антивирус
describe('TestCase_4', () => {
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

	it('Like and visit page products', () => {
		cy.visit('/catalog').wait(2000);
		cy.get('[data-testid="like-btn"]').eq(2).click();
		cy.get('[data-testid="like-btn"]').eq(5).click();

		//ставим лайки на 3-й и 6-1 продукт
		cy.get('[data-testid="like-btn"]').eq(2).should('have.class', 'liked');
		cy.get('[data-testid="like-btn"]').eq(5).should('have.class', 'liked');

		//переходим на страницу 3-го продукта. Проверяем лайки и убираем его
		cy.get('[data-testid="card-product"]').eq(2).click().wait(2000);
		cy.url().should('include', 'product');
		cy.get('[data-testid="like-btn"]').should('have.class', 'liked');
		cy.get('[data-testid="like-btn"]').click();

		//возвращаемся назад
		cy.get('[data-testid="btn-back"]').click();
		//переходим на страницу 6-го продукта. Проверяем лайки и убираем его
		cy.get('[data-testid="card-product"]').eq(5).click().wait(2000);
		cy.url().should('include', 'product');
		cy.get('[data-testid="like-btn"]').should('have.class', 'liked');
		cy.get('[data-testid="like-btn"]').click();

		//возвращаемся назад
		cy.get('[data-testid="btn-back"]').click();

		//проверяем, что лайков нет
		cy.get('[data-testid="like-btn"]').eq(2).should('not.have.class', 'liked');
		cy.get('[data-testid="like-btn"]').eq(5).should('not.have.class', 'liked');
	});
});
