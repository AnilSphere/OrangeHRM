import { Page, Locator } from '@playwright/test';

export class MyInfoPage {
    readonly page: Page;
    // Personal Details
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly employeeId: Locator;
    readonly otherId: Locator;
    readonly driversLicense: Locator;
    readonly licenseExpiryDate: Locator;
    readonly dateOfBirth: Locator;
    readonly nationalityDropdown: Locator;
    readonly maritalStatusDropdown: Locator;
    readonly femaleGender: Locator;
    readonly personalSaveBtn: Locator;
    // Custom Fields
    readonly bloodGroupDropdown: Locator;
    readonly testFieldInput: Locator;
    readonly customFieldSaveBtn: Locator;
    // Attachments
    readonly attachmentAddBtn: Locator;
    readonly attachmentUpload: Locator;
    readonly attachmentComment: Locator;
    readonly attachmentSaveBtn: Locator;
    constructor(page: Page) {

        this.page = page;

        // Employee Name
        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');

        // Personal Details
        this.employeeId =
            page.locator('(//input[contains(@class,"oxd-input")])[5]');

        this.otherId =
            page.locator('(//input[contains(@class,"oxd-input")])[6]');

        this.driversLicense =
            page.locator('(//input[contains(@class,"oxd-input")])[7]');

        this.licenseExpiryDate =
            page.locator('(//input[@placeholder="yyyy-dd-mm"])[1]');

        this.dateOfBirth =
            page.locator('(//input[@placeholder="yyyy-dd-mm"])[2]');

        this.nationalityDropdown =
            page.locator('(//div[contains(@class,"oxd-select-text")])[1]');

        // Robust locator for Marital Status
        this.maritalStatusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' }).locator('.oxd-select-text');

        this.femaleGender =
            page.getByText('Female');

        this.personalSaveBtn =
            page.getByRole('button', { name: 'Save' }).nth(0);

        // Custom Fields
        // this.bloodGroupDropdown =
        //     page.locator('(//div[contains(@class,"oxd-select-text")])[3]');
        this.bloodGroupDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Blood Type' }).locator('.oxd-select-text');
        this.testFieldInput = page.locator(   '//label[contains(text(),"Test_Field")]/../following-sibling::div//input' );
        this.customFieldSaveBtn =
            page.getByRole('button', { name: 'Save' }).nth(1);
        // Attachment Section
        this.attachmentAddBtn =
            page.getByRole('button', { name: 'Add' });
        this.attachmentUpload =
            page.locator('input[type="file"]');
        this.attachmentComment =
            page.locator('textarea');
        this.attachmentSaveBtn =
            page.getByRole('button', { name: 'Save' }).last();
    }

    async selectMaritalStatus(status: string) {
        await this.maritalStatusDropdown.click();
        await this.page.getByRole('option', {name: status, exact: true }) .click();
    }

    async fillPersonalDetails(
        firstName: string,
        middleName: string,
        lastName: string,
        employeeId: string,
        otherId: string,
        driversLicense: string,
        licenseExpiry: string,
        nationality: string,
        maritalStatus: string,
        dob: string
    ) {

        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.employeeId.fill(employeeId);
        await this.otherId.fill(otherId);
        await this.driversLicense.fill(driversLicense);
        await this.licenseExpiryDate.fill(licenseExpiry);
        await this.nationalityDropdown.click();
        await this.page.getByRole('option', {name: nationality,exact: true}).click();
        await this.selectMaritalStatus(maritalStatus);
        await this.dateOfBirth.fill(dob);
        await this.femaleGender.click();
        await this.personalSaveBtn.click();
    }

    async fillCustomFields(
        bloodGroup: string,
        testField: string
    ) {
    await this.bloodGroupDropdown.click();
    await this.page.getByRole('listbox').getByRole('option', { name: bloodGroup }).click();
    await this.testFieldInput.fill(testField);
    await this.customFieldSaveBtn.click();
    }

    async uploadAttachment(
        filePath: string,
        comment: string
    ) {

        await this.attachmentAddBtn.click();

        await this.attachmentUpload.setInputFiles(filePath);

        await this.attachmentComment.fill(comment);

        await this.attachmentSaveBtn.click();
    }
}