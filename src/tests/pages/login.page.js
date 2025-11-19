export class Login {

    //konstruktor třídy
    constructor(page) {
        this.page = page;
        this.prihlasit = this.page.getByLabel('Přihlásit');
        this.tlacitkoZaregistrovat = this.page.getByRole('button', { name: 'Přihlásit' });
    }
    //metody třídy
    async otevrit() {
        await this.page.goto('https://team8-2022brno.herokuapp.com/');
    }

    async zaregistrujSe() {
        await this.prihlasit.click();
        await this.tlacitkoZaregistrovat.click();
    }
}