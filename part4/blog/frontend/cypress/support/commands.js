Cypress.Commands.add("createUser", ({ name, username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    cy.window().then((window) => {
      window.localStorage.setItem("user", JSON.stringify(body));
    });
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blog`,
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        cy.window().then((window) => window.localStorage.getItem("user"))
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }`,
    },
  });
});
