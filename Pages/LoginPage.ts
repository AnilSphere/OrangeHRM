import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameTxt =
            page.locator('input[name="username"]');

        this.passwordTxt =
            page.locator('input[name="password"]');

        this.loginBtn =
            page.getByRole('button', { name: 'Login' });
    }

    async login(
        username: string,
        password: string
    ) {

        await this.usernameTxt.fill(username);

        await this.passwordTxt.fill(password);

        await this.loginBtn.click();
    }
}