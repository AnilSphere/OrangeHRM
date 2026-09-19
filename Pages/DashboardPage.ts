// import { Page, Locator } from '@playwright/test';

// export class DashboardPage {

//     readonly page: Page;
//     readonly myInfoMenu: Locator;

//     constructor(page: Page) {
//         this.page = page;

//         this.myInfoMenu = page.locator('//span[text()="My Info"]');
//     }

//     async navigateToMyInfo() {
//         await this.myInfoMenu.click();
//     }
// }
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly myInfoMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myInfoMenu = page.getByRole('link', { name: 'My Info' });
    }

    async navigateToMyInfo() {
        await this.myInfoMenu.click();
    }
}