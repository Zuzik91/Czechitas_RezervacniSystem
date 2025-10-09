import { test, expect } from '@playwright/test';

test('homework-LOKATORY', async ({ page }) => {

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