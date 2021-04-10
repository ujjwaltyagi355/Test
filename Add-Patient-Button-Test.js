describe("Add-Patient-Button", () => {
  it("Renders login page", () => {
    //Go to the login page
    cy.visit("https://openmrs-spa.org/openmrs/spa/login");
    //Implementing the pause to give time to the site to load
    cy.pause();
    //Checking is field "username" is visible.
    cy.get("input[name='username']").should("be.visible");
  });
  it("Test with an empty input", () => {
    //Alias
    cy.get("input[name='username']").as("usernameField");
    cy.get(".bx--btn--primary").as("continueButton");
    //Clicking the button
    cy.get("@continueButton").click();
    //The focus should be at the username field again
    cy.get("@usernameField").should("have.focus");
  });
  it("show password field", () => {
    //Alias
    cy.get("input[name='username']").as("usernameField");
    cy.get(".bx--btn--primary").as("continueButton");
    //Entering a wrong Username
    cy.get("@usernameField").type("Ujjwal", { delay: 600 });
    //Clicking the button
    cy.get("@continueButton").click();
    //The focus should be on the password field.
    cy.get("input[name='password']").should("have.focus");
  });

  it("Login using wrong credentials", () => {
    //Alias
    cy.get(".bx--btn--primary").as("continueButton");
    cy.get("input[name='password']").as("passwordField");
    //clicking button without entering the password
    cy.get("@continueButton").click();
    //The focus should return to the password field.
    cy.get("@passwordField").should("have.focus");
    //Entering a wrong password
    cy.get("@passwordField").type("Ujjwal123");
    cy.get("@continueButton").click();
    //Error messge should be visible and Username field should have the focus again.
    cy.contains("Incorrect username or password").should("be.visible");
    cy.get("input[name='username']").should("have.focus");
  });

  it("Login with correct credentials", () => {  
    cy.get("input[name='username']").should("be.visible").type("admin");
    cy.get(".bx--btn--primary").should("be.visible").click();
    cy.get("input[name='password']").should("be.visible").type("Admin123");
    cy.get(".bx--btn--primary").click();
    //Checking if we get redirected to the location page
    cy.location("pathname").should("include", "location");
  });

  it("Chooses 'Unkown Location' from the location picker", () => {
    //Selecting the radio buttons and marking the first one i.e. Unknown Location.
    cy.get('[type="radio"]').first().check({force: true});
    cy.get(".bx--btn--primary").click();
    //Checking if we get redirected to the home page
    cy.location("pathname").should("include", "home");
  });
  
  it("Click the Add-Patient Button and check if it redirects corrctly", () => {
      //Selecting the Add-Patient button and clicking on it.
      cy.get('.esm-patient-registration__add-patient-link__slotStyles___29ses').click();
      //Checking if we get redirected to the patient-registartion page
      cy.location("pathname").should("include", "patient-registration");

  });

  it("Click the OpenMRS logo to go back to home", () => {
      //Selecting and clicking the OpenMRS logo to navigate back to the home screen
      cy.get('.bx--header__name').click();
      //Checking if we get redirected to the home screen
      cy.location("pathname").should('include', "home");
  });

});