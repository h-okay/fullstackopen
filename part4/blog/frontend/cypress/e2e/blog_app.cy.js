import blogs from "../../src/services/blogs";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
  });

  it("shows login form by default", function () {
    cy.contains("Blogs");
    cy.contains("Login to application");
    cy.contains("username:");
    cy.contains("password:");
  });

  describe("Login form is shown", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
      cy.createUser({ name: "Test user", username: "test", password: "test" });
      cy.visit("");
    });

    it("can't login with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("wrong");
      cy.get("#loginButton").click();
      cy.contains("Invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });

    it("can login with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#loginButton").click();
      cy.contains("Test user logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
      cy.createUser({ name: "Test user", username: "test", password: "test" });
      cy.login({ username: "test", password: "test" });
    });

    it("user can add a new blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test blog");
      cy.get("#author").type("Test author");
      cy.get("#url").type("testblog.com");
      cy.get("#createButton").click();
      cy.contains("Test blog");
      cy.contains("Test author");
    });

    it("user can like a blog", function () {
      cy.createBlog({
        title: "Test blog",
        author: "Test author",
        url: "testblog.com",
        likes: 0,
      });
      cy.visit("");
      cy.contains("Test blog").parent().parent().find("#details").click();
      cy.contains("Test blog").parent().parent().find("#likeButton").click();
      cy.contains("Test blog").parent().parent().find("#likes").contains("1");
      cy.contains("Test blog").parent().parent().find("#likeButton").click();
      cy.contains("Test blog").parent().parent().find("#likes").contains("2");
    });

    it("user can delete a blog", function () {
      cy.createBlog({
        title: "Test blog",
        author: "Test author",
        url: "testblog.com",
        likes: 0,
      });
      cy.visit("");
      cy.contains("Test blog").parent().parent().find("#details").click();
      cy.contains("Test blog").parent().parent().find("#removeButton").click();
      cy.contains("Blog Test blog by Test author removed");
      cy.get(".success").should("have.css", "color", "rgb(0, 128, 0)");
      cy.contains("Test blog").should("not.exist");
    });

    it("user can only delete own blogs", function () {
      cy.createBlog({
        title: "Test blog",
        author: "Test author",
        url: "testblog.com",
        likes: 0,
      });
      cy.get("#logout").click();
      cy.createUser({
        name: "Another user",
        username: "another",
        password: "test",
      });
      cy.login({ username: "another", password: "test" });
      cy.contains("Test blog").parent().parent().find("#details").click();
      cy.contains("Test blog").parent().parent().find("#removeButton").click();
      cy.contains("unauthorized user");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.contains("Test blog").should("exist");
    });

    it("blogs are ordered by likes", function () {
      cy.createBlog({
        title: "blog1",
        author: "Test author",
        url: "testblog1.com",
        likes: 0,
      });
      cy.reload();
      cy.createBlog({
        title: "blog2",
        author: "Test author 1",
        url: "testblog2.com",
        likes: 1,
      });
      cy.reload();
      cy.createBlog({
        title: "blog3",
        author: "Test author 2",
        url: "testblog3.com",
        likes: 2,
      });
      cy.reload();

      cy.get(".blog").eq(0).should("contain", "blog3");
      cy.get(".blog").eq(1).should("contain", "blog2");
      cy.get(".blog").eq(2).should("contain", "blog1");

      cy.contains("blog1").parent().parent().find("#details").click();
      cy.contains("blog2").parent().parent().find("#details").click();
      cy.contains("blog3").parent().parent().find("#details").click();

      cy.contains("blog1").parent().parent().find("#likeButton").click();
      cy.wait(500);
      cy.contains("blog1").parent().parent().find("#likeButton").click();
      cy.wait(500);
      cy.contains("blog1").parent().parent().find("#likeButton").click();

      cy.get(".blog").eq(0).should("contain", "blog1");
      cy.get(".blog").eq(1).should("contain", "blog3");
      cy.get(".blog").eq(2).should("contain", "blog2");

      cy.contains("blog2").parent().parent().find("#likeButton").click();
      cy.wait(500);
      cy.contains("blog2").parent().parent().find("#likeButton").click();
      cy.wait(500);
      cy.contains("blog2").parent().parent().find("#likeButton").click();

      cy.get(".blog").eq(0).should("contain", "blog2");
      cy.get(".blog").eq(1).should("contain", "blog1");
      cy.get(".blog").eq(2).should("contain", "blog3");
    });
  });
});
