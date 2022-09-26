describe("nextrains", () => {
  beforeEach(() => {
    const now = new Date(2022, 8, 26, 9, 30, 0);
    cy.clock(now);
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/**",
      },
      { fixture: "train.json" }
    ).as("getTrainInfo");
    cy.visit("http://localhost:5173/");
  });

  it("front page can be opened", () => {
    cy.contains(
      "Please begin by entering the departure station in the 'from' field."
    );
    cy.contains("from");
    cy.contains("to");
    cy.contains("Return");
    cy.contains("Add to Saved");
  });

  it("can enter from and to stations and render train info", () => {
    cy.get("input#from").should("be.visible").type("Reading (RDG){enter}");
    cy.get("input#to").should("be.visible").type("Thatcham (THA){enter}");
    cy.contains("RDG → THA");
    cy.contains("Platform");
    cy.contains("→ Newbury");
    cy.contains("Fastest");
    cy.contains("m");
  });

  it("notice is shown", () => {
    cy.get("input#from").should("be.visible").type("Thatcham (THA){enter}");
    cy.get("button[aria-label='Show notices']").should("be.visible").click();
    cy.contains("This is a test notice message");
  });

  it("can add interchange station and display train info correctly", () => {
    cy.get("button[aria-label='Add a Change Station']")
      .should("be.visible")
      .click();
    cy.get("input#from")
      .should("be.visible")
      .type("Thatcham (THA){enter}")
      .click();
    cy.get("input#to")
      .should("be.visible")
      .type("London Paddington (PAD){enter}")
      .click();
    cy.get("input#interchange")
      .should("be.visible")
      .type("Reading (RDG){enter}")
      .click();
    cy.contains("THA → RDG");
    cy.contains("RDG → PAD");
  });

  it("can reverse the route and display train info correctly", () => {
    cy.get("button[aria-label='Add a Change Station']")
      .should("be.visible")
      .click();
    cy.get("input#from")
      .should("be.visible")
      .type("Thatcham (THA){enter}")
      .click();
    cy.get("input#to")
      .should("be.visible")
      .type("London Paddington (PAD){enter}")
      .click();
    cy.get("input#interchange")
      .should("be.visible")
      .type("Reading (RDG){enter}")
      .click();
    cy.get("button[aria-label='Reverse the station orders']").click();
    cy.contains("PAD → RDG");
    cy.contains("RDG → THA");
  });

  it("can save a train route", () => {
    cy.get("input#from")
      .should("be.visible")
      .type("Thatcham (THA){enter}")
      .click();
    cy.get("input#to")
      .should("be.visible")
      .type("London Paddington (PAD){enter}")
      .click();
    cy.get("button[aria-label='Add to favorites']")
      .should("be.visible")
      .click();
    cy.get("button[aria-label='Show saved routes']")
      .should("be.visible")
      .click();
    cy.contains("THA → PAD");
    cy.get("button[aria-label='delete saved route']").should("be.visible");
  });

  it("can delete a saved train route", () => {
    cy.get("input#from")
      .should("be.visible")
      .type("Thatcham (THA){enter}")
      .click();
    cy.get("input#to")
      .should("be.visible")
      .type("London Paddington (PAD){enter}")
      .click();
    cy.get("button[aria-label='Add to favorites']")
      .should("be.visible")
      .click();
    cy.get("button[aria-label='Show saved routes']")
      .should("be.visible")
      .click();
    cy.contains("THA → PAD");
    cy.get("button[aria-label='delete saved route']")
      .should("be.visible")
      .click();
    cy.get("button[aria-label='delete saved route']").should("not.exist");
    cy.get("button[aria-label='Show saved routes']").should("not.exist");
  });
});
