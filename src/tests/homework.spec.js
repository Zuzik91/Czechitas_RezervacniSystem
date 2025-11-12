import { test, expect } from '@playwright/test';
import { afterEach, beforeEach } from 'node:test';

require('dotenv').config();

test('Homework-LOKATORY', async ({ page }) => {

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    //Políčko pro jméno a příjmení
    //XPATH
    await page.locator('//body//div[@class="card"]//input[@id="name"]').fill('Zuzana');
    //CSS
    await page.locator('body .card input#name').fill('Zuzana TESTER');
    //PW
    await page.getByLabel('Jméno a příjmení').fill('Zuzana TESTER Šmídová');

    //Políčko pro email
    //XPATH
    await page.locator('//body//div[@class="card"]//input[@id="email"]').fill('milujiTe');
    //CSS
    await page.locator('body .card input#email').fill('milujiTe@milu');
    //PW
    await page.getByLabel('Email').fill('milujiTe@milujiTe.cz');

    //Políčko pro zadání hesla
    //XPATH
    await page.locator('//body//div[@class="card"]//input[@id="password"]').fill('Hes');
    //CSS
    await page.locator('body .card input#password').fill('Heslo');
    //PW
    await page.getByLabel('Heslo').fill('Heslo123');

    //Políčko pro zadání hesla
    //XPATH
    await page.locator('//body//div[@class="card"]//input[@id="password-confirm"]').fill('Hes');
    //CSS
    await page.locator('body .card input#password-confirm').fill('Heslo');
    //PW
    await page.getByLabel('Kontrola hesla').fill('Heslo123');

    //Tlačítko na registraci
    //XPATH
    await page.locator('//body//div[@class="card"]//button[contains(text(), "egistr")]').screenshot({ path: 'xpath_btn.png' });
    //CSS
    await page.locator('body .card button.btn.btn-primary').screenshot({ path: 'css_btn.png' });
    //PW
    await page.getByRole('button', { name: 'Zaregistrovat' }).click();
});

test('Dobrovolný úkol lokátory_PW - selectors.trnavsky.eu', async ({ page }) => {

    await page.goto('https://selectors.trnavsky.eu');

    //1. Základní tlačítka
    await page.getByRole('heading', { name: '1. Základní tlačítka' }).isVisible();

    await page.getByText('Klikni na mě').click();

    await page.getByRole('button', { name: 'Speciální tlačítko' }).filter({ has: page.locator('.special-button') }).click();

});

test('Lekce 3 - BreakOut room', async ({ page }) => {

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    const poleHeslo = page.getByLabel('Heslo');
    console.log("Je pole viditelné? " + await poleHeslo.isVisible());
    console.log("Je pole aktivní? " + await poleHeslo.isEnabled());

    const tlacitkoPrihlasit = page.getByRole('button', { name: 'Zaregistrovat' });
    const textTlacitka = await tlacitkoPrihlasit.textContent();
    console.log("Text tlačítka je: " + textTlacitka);
});

test('Homework - Lekce 3', async ({ page }) => {

    const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
    const email = page.getByLabel('Email');
    const heslo = page.getByLabel('Heslo');
    const kontrolaHesla = page.getByLabel('Kontrola hesla');
    const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
    await email.fill('milujiTe@milujiTe.cz');
    await heslo.fill('Heslo123');
    await kontrolaHesla.fill('Heslo123');
    await tlacitkoZaregistrovat.click();
});

test('Lekce 4 - BreakOut room', async ({ page }) => {
    await page.goto('https://team8-2022brno.herokuapp.com/registrace');
    await expect(page).toHaveScreenshot();

});

test('Homework: validní registrace včetně asertace o úspěšném přihlášení - Lekce 4', async ({ page }) => {

    const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
    const email = page.getByLabel('Email');
    const heslo = page.getByLabel('Heslo');
    const kontrolaHesla = page.getByLabel('Kontrola hesla');
    const kontrolaHeslaVcetneTextu = page.locator('xpath=//div[@class="form-group row"][4]');
    const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

    const now = new Date().toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_');
    const emailValue = `${now}@milujiTe.cz`;

    const loginValueElement = page.getByRole('button').filter({ has: page.locator('strong') });
    const loginValue = 'Zuzana TESTER Šmídová';

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    await expect(jmenoPrijmeni).toBeVisible();
    await jmenoPrijmeni.fill(loginValue);
    await expect(email).toBeEditable();
    await email.fill(emailValue);
    await expect(heslo).toBeEnabled();
    await heslo.fill('Heslo123');
    await expect(kontrolaHeslaVcetneTextu).toHaveText('Kontrola hesla');
    await kontrolaHesla.fill('Heslo123');
    await tlacitkoZaregistrovat.click();
    await expect(loginValueElement).toContainText(loginValue.slice(0, 5));
    await expect(page.getByText('Přihlásit', { exact: true })).not.toBeVisible();
});

test('Homework: registrace uživatele s již existujícím emailem - Lekce 4', async ({ page }) => {

    const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
    const email = page.getByLabel('Email');
    const heslo = page.getByLabel('Heslo');
    const kontrolaHesla = page.getByLabel('Kontrola hesla');
    const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
    await expect.soft(jmenoPrijmeni).toHaveValue('Zuzana TESTER Šmídová');
    await email.fill('milujiTe@milujiTe.cz');
    await expect.soft(email).toHaveValue(/^mi.*/, { timeout: 15000 });
    await heslo.fill('Heslo123');
    await expect.soft(heslo).toHaveValue(/123/);
    await kontrolaHesla.fill('Heslo123');
    await expect.soft(tlacitkoZaregistrovat).toHaveText('Zaregistrovat');
    await tlacitkoZaregistrovat.click();
    await expect(page.getByText('Účet s tímto emailem již existuje')).toBeVisible();
});

test('Homework: registraci uživatele s nevalidním heslem - Lekce 4', async ({ page }) => {

    const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
    const email = page.getByLabel('Email');
    const heslo = page.getByLabel('Heslo');
    const kontrolaHesla = page.getByLabel('Kontrola hesla');
    const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
    await email.fill('milujiTe@milujiTe.cz');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await heslo.fill('Heslo');
    await expect(page.getByText('Přihlásit', { exact: true })).toBeEnabled();
    await kontrolaHesla.fill('Heslo');
    await expect(page.getByAltText('Domů')).toBeVisible();
    await tlacitkoZaregistrovat.click();
    await expect(email).not.toBeEmpty();
    await expect(page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici')).toBeVisible();
});

test.describe('Homework - Lekce 5', { tag: "@smoke" }, () => {

    //Načtení url
    test.beforeEach(async ({ page }) => {
        await page.goto('https://team8-2022brno.herokuapp.com/registrace');
    });

    test('Registrace s nevalidním heslem', { tag: "@negativ" }, async ({ page }) => {
        const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
        const email = page.getByLabel('Email');
        const heslo = page.getByLabel('Heslo');
        const kontrolaHesla = page.getByLabel('Kontrola hesla');
        const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

        await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
        await email.fill('milujiTe@milujiTe.cz');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await heslo.fill('Heslo');
        await expect(page.getByText('Přihlásit', { exact: true })).toBeEnabled();
        await kontrolaHesla.fill('Heslo');
        await expect(page.getByAltText('Domů')).toBeVisible();
        await tlacitkoZaregistrovat.click();
        await expect(email).not.toBeEmpty();
        await expect(page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici')).toBeVisible();
    });

    test('Registrace s již zaregistrovaným emailem', { tag: "@negativ" }, async ({ page }) => {
        const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
        const email = page.getByLabel('Email');
        const heslo = page.getByLabel('Heslo');
        const kontrolaHesla = page.getByLabel('Kontrola hesla');
        const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

        await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
        await expect.soft(jmenoPrijmeni).toHaveValue('Zuzana TESTER Šmídová');
        await email.fill('milujiTe@milujiTe.cz');
        await expect.soft(email).toHaveValue(/^mi.*/, { timeout: 15000 });
        await heslo.fill('Heslo123');
        await expect.soft(heslo).toHaveValue(/123/);
        await kontrolaHesla.fill('Heslo123');
        await expect.soft(tlacitkoZaregistrovat).toHaveText('Zaregistrovat');
        await tlacitkoZaregistrovat.click();
        await expect(page.getByText('Účet s tímto emailem již existuje')).toBeVisible();
    });

    test.describe('Úspěšná registrace', { tag: "@smoke" }, () => {

        //Odhlášení
        test.afterEach(async ({ page }) => {
            await page.getByRole('button', {name: /^Zuzana/}).click();
            await page.getByText('Odhlásit').click();
        });

        test('Homework: validní registrace včetně asertace o úspěšném přihlášení - Lekce 4', { tag: "@happy path" }, async ({ page }) => {

            const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
            const email = page.getByLabel('Email');
            const heslo = page.getByLabel('Heslo');
            const kontrolaHesla = page.getByLabel('Kontrola hesla');
            const kontrolaHeslaVcetneTextu = page.locator('xpath=//div[@class="form-group row"][4]');
            const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

            const now = new Date().toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_');
            const emailValue = `${now}@milujiTe.cz`;

            const loginValueElement = page.getByRole('button').filter({ has: page.locator('strong') });
            const loginValue = 'Zuzana TESTER Šmídová';

            await expect(jmenoPrijmeni).toBeVisible();
            await jmenoPrijmeni.fill(loginValue);
            await expect(email).toBeEditable();
            await email.fill(emailValue);
            await expect(heslo).toBeEnabled();
            await heslo.fill('Heslo123');
            await expect(kontrolaHeslaVcetneTextu).toHaveText('Kontrola hesla');
            await kontrolaHesla.fill('Heslo123');
            await tlacitkoZaregistrovat.click();
            await expect(loginValueElement).toContainText(loginValue.slice(0, 5));
            await expect(page.getByText('Přihlásit', { exact: true })).not.toBeVisible();
        });
    });
});

test.describe('Homework - Lekce 6', { tag: "@smoke" }, () => {

    const { USER_NAME, USER_EMAIL, USER_PASSWORD } = process.env;

    async function vyplnJmeno(page) {
        const { USER_NAME } = process.env;
        const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');

        await jmenoPrijmeni.fill(USER_NAME);
    }

    async function vyplnEmail(page) {
        const { USER_EMAIL } = process.env;
        const email = page.getByLabel('Email');

        await email.fill(USER_EMAIL);
    }

    async function vyplnHeslo(page) {
        const { USER_PASSWORD } = process.env;
        const heslo = page.getByLabel('Heslo');

        await heslo.fill(USER_PASSWORD);
    }

    async function kontrolaHeslaFun(page) {
        const { USER_PASSWORD } = process.env;
        const kontrolaHesla = page.getByLabel('Kontrola hesla');

        await kontrolaHesla.fill(USER_PASSWORD);
    }

    //Načtení url
    test.beforeEach(async ({ page }) => {
        await page.goto('https://team8-2022brno.herokuapp.com/registrace');
    });

    test('Registrace s nevalidním heslem', { tag: "@negativ" }, async ({ page }) => {
        const email = page.getByLabel('Email');
        const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

        await vyplnJmeno(page);
        await vyplnEmail(page);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await vyplnHeslo(page);
        await expect(page.getByText('Přihlásit', { exact: true })).toBeEnabled();
        await kontrolaHeslaFun(page);
        await expect(page.getByAltText('Domů')).toBeVisible();
        await tlacitkoZaregistrovat.click();
        await expect(email).not.toBeEmpty();
        await expect(page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici')).toBeVisible();
    });

    test('Registrace s již zaregistrovaným emailem', { tag: "@negativ" }, async ({ page }) => {
        const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
        const email = page.getByLabel('Email');
        const heslo = page.getByLabel('Heslo');
        const kontrolaHesla = page.getByLabel('Kontrola hesla');
        const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

        await vyplnJmeno(page);
        await expect.soft(jmenoPrijmeni).toHaveValue('Zuzana TESTER Šmídová');
        await vyplnEmail(page);
        await expect.soft(email).toHaveValue(/^mi.*/, { timeout: 15000 });
        await heslo.fill(USER_PASSWORD+123);
        await expect.soft(heslo).toHaveValue(/123/);
        await kontrolaHesla.fill(USER_PASSWORD+123);
        await expect.soft(tlacitkoZaregistrovat).toHaveText('Zaregistrovat');
        await tlacitkoZaregistrovat.click();
        await expect(page.getByText('Účet s tímto emailem již existuje')).toBeVisible();
    });

    test.describe('Úspěšná registrace', { tag: "@smoke" }, () => {

        //Odhlášení
        test.afterEach(async ({ page }) => {
            await page.getByRole('button', {name: /^Zuzana/}).click();
            await page.getByText('Odhlásit').click();
        });

        test('Homework: validní registrace včetně asertace o úspěšném přihlášení - Lekce 4', { tag: "@happy path" }, async ({ page }) => {
            const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
            const email = page.getByLabel('Email');
            const heslo = page.getByLabel('Heslo');
            const kontrolaHesla = page.getByLabel('Kontrola hesla');
            const kontrolaHeslaVcetneTextu = page.locator('xpath=//div[@class="form-group row"][4]');
            const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

            const now = new Date().toISOString()
                .replace(/[:.]/g, '-')
                .replace('T', '_');
            const emailValue = `${now}@milujiTe.cz`;

            const loginValueElement = page.getByRole('button').filter({ has: page.locator('strong') });
            const loginValue = USER_NAME;

            await expect(jmenoPrijmeni).toBeVisible();
            await jmenoPrijmeni.fill(loginValue);
            await expect(email).toBeEditable();
            await email.fill(emailValue);
            await expect(heslo).toBeEnabled();
            await heslo.fill(USER_PASSWORD+123);
            await expect(kontrolaHeslaVcetneTextu).toHaveText('Kontrola hesla');
            await kontrolaHesla.fill(USER_PASSWORD+123);
            await tlacitkoZaregistrovat.click();
            await expect(loginValueElement).toContainText(loginValue.slice(0, 5));
            await expect(page.getByText('Přihlásit', { exact: true })).not.toBeVisible();
        });
    });
});