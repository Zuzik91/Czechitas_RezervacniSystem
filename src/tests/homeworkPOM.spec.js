import { test, expect } from '@playwright/test';
import { afterEach, beforeEach } from 'node:test';
import { Registrace } from '../tests/pages/registrace.page.js';

require('dotenv').config();

test.describe('Homework - Lekce 7', { tag: "@smoke" }, () => {

    const { USER_NAME, USER_EMAIL, USER_PASSWORD } = process.env;

    //Načtení url
    test.beforeEach(async ({ page }) => {
        const registrace = new Registrace(page);
        await registrace.otevrit();
        await registrace.zaregistrujSe();
    });

    test('Registrace s nevalidním heslem', { tag: "@negativ" }, async ({ page }) => {
        const registrace = new Registrace(page);

        await registrace.doplnJmeno(USER_NAME);
        await registrace.doplnEmail(registrace.emailValue);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await registrace.doplnHeslo(USER_PASSWORD);
        await expect(page.getByText('Přihlásit', { exact: true })).toBeEnabled();
        await registrace.doplnKontroluHesla(USER_PASSWORD);
        await expect(page.getByAltText('Domů')).toBeVisible();
        await registrace.klikniNaZaregistrovat();
        await expect(registrace.email).not.toBeEmpty();
        await expect(page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici')).toBeVisible();
    });

    test('Registrace s již zaregistrovaným emailem', { tag: "@negativ" }, async ({ page }) => {
        const registrace = new Registrace(page);

        await registrace.doplnJmeno(USER_NAME);
        await expect.soft(registrace.jmenoPrijmeni).toHaveValue('Zuzana TESTER Šmídová');
        await registrace.doplnEmail(USER_EMAIL);
        await expect.soft(registrace.email).toHaveValue(/^mi.*/, { timeout: 15000 });
        await registrace.doplnHeslo(USER_PASSWORD+123);
        await expect.soft(registrace.heslo).toHaveValue(/123/);
        await registrace.doplnKontroluHesla(USER_PASSWORD+123);
        await expect.soft(registrace.tlacitkoZaregistrovat).toHaveText('Zaregistrovat');
        await registrace.klikniNaZaregistrovat();
        await expect(page.getByText('Účet s tímto emailem již existuje')).toBeVisible();
    });

    test.describe('Úspěšná registrace', { tag: "@smoke" }, () => {

        //Odhlášení
        test.afterEach(async ({ page }) => {
            const registrace = new Registrace(page);

            await registrace.odhlasSe();
        });

        test('Homework: validní registrace včetně asertace o úspěšném přihlášení - Lekce 4', { tag: "@happy path" }, async ({ page }) => {
            const registrace = new Registrace(page);

            await expect(registrace.jmenoPrijmeni).toBeVisible();
            await registrace.doplnJmeno(USER_NAME);
            await expect(registrace.email).toBeEditable();
            await registrace.doplnEmail(registrace.emailValue);
            await expect(registrace.heslo).toBeEnabled();
            await registrace.doplnHeslo(USER_PASSWORD+123);
            await expect(registrace.kontrolaHeslaVcetneTextu).toHaveText('Kontrola hesla');
            await registrace.doplnKontroluHesla(USER_PASSWORD+123);
            await registrace.klikniNaZaregistrovat();
            await expect(page.getByText('Přihlásit', { exact: true })).not.toBeVisible();
        });
    });
});

/*
Zkouška konstruktoru a metody třídy Registrace

test('Uspěšné spuštění testu', async ({ page }) => {
    const registrace = new Registrace(page);

    await registrace.otevrit();
    await registrace.doplnJmeno();
});
*/