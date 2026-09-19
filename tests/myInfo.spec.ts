import { test, expect } from '../fixtures/baseFixture';
import { employeeData } from '../test-data/employeeData';
import {
    APP_URL,
    ATTACHMENT_PATH
} from '../utils/constants';

test.describe('OrangeHRM My Info Module', () => {

    test(
        'Fill Personal Details, Custom Fields and Attachment',
        async ({
            page,
            loginPage,
            dashboardPage,
            myInfoPage
        }) => {

            // Navigate to Login Page
            await page.goto(APP_URL);

            // Login
            await loginPage.login(
                employeeData.username,
                employeeData.password
            );

            // Navigate to My Info Page
            await dashboardPage.navigateToMyInfo();

            // Verify Personal Details Page Loaded
            await expect(page.getByRole('heading', {name: 'Personal Details'})).toBeVisible();

            // Fill Personal Details
            await myInfoPage.fillPersonalDetails(
                employeeData.firstName,
                employeeData.middleName,
                employeeData.lastName,
                employeeData.employeeId,
                employeeData.otherId,
                employeeData.driversLicense,
                employeeData.licenseExpiry,
                employeeData.nationality,
                employeeData.maritalStatus,
                employeeData.dob
            );

            // Fill Custom Fields
            await myInfoPage.fillCustomFields(
                employeeData.bloodGroup,
                employeeData.testField
            );

            // Upload Attachment
            await myInfoPage.uploadAttachment(
                ATTACHMENT_PATH,
                employeeData.attachmentComment
            );

            // Validation
            await expect(page).toHaveURL(
                /viewPersonalDetails/
            );

        }
    );

});