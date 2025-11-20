export class Login {

    //konstruktor třídy
    constructor(page) {
        this.page = page;
        this.prihlasit = this.page.locator('xpath=//body//a[contains(., "Přihlásit")]');
        this.tlacitkoZaregistrovat = this.page.locator('xpath=//body//a[contains(., "Zaregistrujte se")]');
        this.nadpisPrihlaseni = this.page.getByRole('heading', { name: 'Přihlášení' });
    }

    //metody třídy
    async otevrit() {
        await this.page.goto('https://team8-2022brno.herokuapp.com/');
    }

    async zaregistrujSe() {
        await this.prihlasit.click();
        await this.nadpisPrihlaseni.waitFor({ state: 'visible' });
        await this.tlacitkoZaregistrovat.click();
    }
}