describe("Testing Mud Run 2020 form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    });
    it("Add test to the inputs and submit form", function() {
      cy.get('input[name="name"]')
      .type("Latosha")
      .should("have.value", "Latosha")

        cy.get('input[name="lname"]')
        .type("Tims")
        .should("have.value", "Tims")

        cy.get('#gender')
        .select('female')
        .should("have.value", 'female')
        
        cy.get("input[name='email']")
        .type("ltims080913@hotmail.com")
        .should("have.value", "ltims080913@hotmail.com")

        cy.get("#password")
        .type("rubberducky123")
        .should("have.value", "rubberducky123")

        cy.get("#shirt")
        .select('large')
        .should("have.value", "large")

        cy.get("#phoneNumber")
        .type('909-284-0410')
        .should("have.value", "909-284-0410")

        cy.get("#race")
        .select('10k')
        .should("have.value", "10k")

        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked")

        cy.get('button')
        .click()
        

    });
  });