import { test, expect } from '@playwright/test';

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

    await page.goto('https://team8-2022brno.herokuapp.com/registrace');

    const jmenoPrijmeni = page.getByLabel('Jméno a příjmení');
    const email = page.getByLabel('Email');
    const heslo = page.getByLabel('Heslo');
    const kontrolaHesla = page.getByLabel('Kontrola hesla');
    const tlacitkoZaregistrovat = page.getByRole('button', { name: 'Zaregistrovat' });

    await jmenoPrijmeni.fill('Zuzana TESTER Šmídová');
    await email.fill('milujiTe@milujiTe.cz');
    await heslo.fill('Heslo123');
    await kontrolaHesla.fill('Heslo123');
    await tlacitkoZaregistrovat.click();
});