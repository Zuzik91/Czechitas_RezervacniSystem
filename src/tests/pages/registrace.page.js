import { Login } from "./login.page.js";

export class Registrace extends Login {

    //konstruktor třídy
    constructor(page) {
        this.page = page;
        super this.const login = new Login(page);
        this.jmenoPrijmeni = this.page.getByLabel('Jméno a příjmení');
        this.email = this.page.getByLabel('Email');
        this.heslo = this.page.getByLabel('Heslo');
        this.kontrolaHesla = this.page.getByLabel('Kontrola hesla');
        this.tlacitkoZaregistrovat = this.page.getByRole('button', { name: 'Zaregistrovat' });
        this.userRegistr = this.page.getByRole('button', {name: /^Zuzana/});
        this.tlacitkoOdhlasit = this.page.getByText('Odhlásit');
        this.kontrolaHeslaVcetneTextu = this.page.locator('xpath=//div[@class="form-group row"][4]');

        const now = new Date().toISOString()
            .replace(/[:.]/g, '-')
            .replace('T', '_');
        this.emailValue = `${now}@milujiTe.cz`;
    }

    //metody třídy
    async otevritRegistraci() {
        await this.page.goto('https://team8-2022brno.herokuapp.com/registrace');
    }

    async doplnJmeno(name) {
        await this.jmenoPrijmeni.fill(name);
    }

    async doplnEmail(email) {
        await this.email.fill(email);
    }

    async doplnHeslo(heslo) {
        await this.heslo.fill(heslo);
    }

    async doplnKontroluHesla(heslo) {
        await this.kontrolaHesla.fill(heslo);
    }

    async klikniNaZaregistrovat() {
        await this.tlacitkoZaregistrovat.click();
    }

    async odhlasSe() {
        await this.userRegistr.click();
        await this.tlacitkoOdhlasit.click();
    }
}