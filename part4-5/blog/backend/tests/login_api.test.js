const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

describe("when try to login", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("login_test", 10);
    const user = new User({
      username: "login_test",
      name: "login_test",
      passwordHash,
    });
    await user.save();
  });

  test("login with valid credentials generates a token", async () => {
    const user = {
      username: "login_test",
      name: "login_test",
      password: "login_test",
    };

    const result = await api.post("/api/login").send(user);
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    expect(result.body.username).toBe("login_test");
    expect(result.body.name).toBe("login_test");
  });

  test("login with invalid credentials returns 401", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "root", password: "wrongpass" })
      .expect(401);
    expect(result.body.error).toBe("Invalid username or password");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
