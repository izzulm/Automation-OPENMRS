import { type Locator, type Page } from '@playwright/test';

export class openMRSPages {
    readonly page: Page;

    // Login Page
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    // Home Page
    readonly homeTitle: Locator;
    readonly activeVisitsTitle: Locator;
    readonly totalVisitsToday: Locator;
    readonly scheduledForToday: Locator;
    readonly searchField: Locator;
    readonly PatientListTitle: Locator;

    // Sidebar
    readonly homeMenuButton: Locator;
    readonly patientListsMenuButton: Locator;
    readonly laboratoryMenuButton: Locator;
    readonly serviceQueuesMenuButton: Locator;
    readonly appointmentsMenuButton: Locator;

    // Patient List page
    readonly newListButton: Locator;
    readonly nameField: Locator;
    readonly descriptionField: Locator;
    readonly saveButton: Locator;


    constructor (page:Page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton =  page.getByRole('button', { name: 'Log in' });

        // Home Page
        this.homeTitle = page.getByRole('paragraph').filter({ hasText: 'Home' });
        this.activeVisitsTitle = page.locator('header').filter({ hasText: 'Active Visits' });
        this.totalVisitsToday = page.getByText('Total Visits Today');
        this.scheduledForToday = page.getByText('Scheduled For Today');
        this.searchField = page.locator("//input[contains(@id, 'search-input')]");
        this.PatientListTitle = page.getByRole('paragraph').filter({ hasText: 'Patient lists' });

        // SideBar
        this.homeMenuButton = page.locator("(//a[@href='/openmrs/spa/home'])[2]");
        this.patientListsMenuButton = page.locator("//a[@href='/openmrs/spa/home/patient-lists']");
        this.activeVisitsTitle = page.locator("//a[@href='/openmrs/spa/home/patient-lists']");
        this.laboratoryMenuButton = page.locator("[@href='/openmrs/spa/home/laboratory']");
        this.serviceQueuesMenuButton = page.locator("[@href='/openmrs/spa/home/service-queues']");
        this.appointmentsMenuButton = page.locator("[@href='/openmrs/spa/home/appointments']");

        // Patient List Page
        this.newListButton =  page.locator("//button[contains(., 'New list')]");
        this.nameField = page.locator("//input[@placeholder='e.g. Potential research participants']");
        this.descriptionField = page.locator("//textarea[@name='description']");
        this.saveButton =  page.locator("//button[contains(., 'Create list')]");




    }
}