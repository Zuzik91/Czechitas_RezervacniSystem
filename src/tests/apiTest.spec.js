import {expect, test} from '@playwright/test';
import { Login } from '../tests/pages/login.page.js';
import { Registrace } from '../tests/pages/registrace.page.js';

require('dotenv').config();

test.describe('API Tests', async () => {

    let apiRequesrContext;
    test.beforeAll(async ({ playwright }) => {
        apiRequesrContext = await playwright.request.newContext({
            baseURL: 'https://team8-2022brno.herokuapp.com/',
        });
    });

    test('GET / - should return something', async () => {
        const response = await apiRequesrContext.get('/');
        console.log(response);
        expect(response.status()).toBe(200);
    });
});

test.describe('API Tests - Registration', async () => {

    let apiRequesrContext;

    test.beforeAll(async ({ playwright }) => {
        apiRequesrContext = await playwright.request.newContext({
            baseURL: 'https://team8-2022brno.herokuapp.com/',
        });
    });

    test("Registrace", async ({ page }) => {
        const { USER_NAME, USER_PASSWORD } = process.env;
        const registracePage = new Registrace(page);

        const response = await apiRequesrContext.post('api/users/register', {
            json: {
                name: USER_NAME,
                email: registracePage.emailValue,
                password: USER_PASSWORD+123
            }
        });

        const loginPage = new Login(page);
        await loginPage.otevrit();
        await loginPage.zaregistrujSe();

        await registracePage.login(USER_NAME, registracePage.emailValue, USER_PASSWORD+123);
        await expect(page.getByText('Přihlásit', { exact: true })).not.toBeVisible();
        });
    });