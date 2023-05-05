const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { initialBlogs, blogsInDb } = require("../utils/test_helper");
const app = require("../app");
const api = supertest(app);

let bearerToken = "";
let testUserId = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
  await User.deleteMany({});
  const newUser = new User({
    username: "blog_test",
    name: "blog_test",
    passwordHash: await bcrypt.hash("blog_test", 10),
  });
  const savedUser = await newUser.save();
  const userForToken = {
    username: savedUser.username,
    id: savedUser.id,
  };
  testUserId = savedUser.id;
  bearerToken = jwt.sign(userForToken, process.env.SECRET);
});

describe("when there is initially some blogs saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blog")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("blog count has the expected value", async () => {
    const response = await api.get("/api/blog");
    const dbBlogs = await blogsInDb();
    expect(response.body).toHaveLength(dbBlogs.length);
  });

  test("returned blogs has the correct information", async () => {
    const response = await api.get("/api/blog");
    const authors = response.body.map((r) => r.author);
    const titles = response.body.map((r) => r.title);
    expect(authors).toContain("Robert C. Martin");
    expect(authors).toContain("Michael Chan");
    expect(titles).toContain("Canonical string reduction");
    expect(titles).toContain("Type wars");
  });

  test("returned blog has an id defined", async () => {
    const response = await api.get("/api/blog");
    const ids = response.body.map((r) => r.id);
    expect(ids).toBeDefined();
  });
});

describe("when a new blog is added", () => {
  test("when not authorized, returns 401", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "https://testblog.com/",
      likes: 0,
    };
    await api.post("/api/blog").send(newBlog).expect(401);
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "https://testblog.com/",
      likes: 0,
    };
    await api
      .post("/api/blog")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const dbBlogs = await blogsInDb();
    const titles = dbBlogs.map((r) => r.title);
    const authors = dbBlogs.map((r) => r.author);
    const urls = dbBlogs.map((r) => r.url);
    const likes = dbBlogs.map((r) => r.likes);

    expect(dbBlogs).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContainEqual("Test blog");
    expect(authors).toContainEqual("Test author");
    expect(urls).toContainEqual("https://testblog.com/");
    expect(likes).toContainEqual(0);
  });

  test("if likes property is missing, it will default to 0", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "https://testblog.com/",
    };

    await api
      .post("/api/blog")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blog");
    const justAdded = response.body.find((r) => r.title === "Test blog");
    expect(justAdded.likes).toBe(0);
  });

  test("if title and url properties are missing, it will return 400", async () => {
    const newBlog = {
      author: "Test author",
    };
    await api
      .post("/api/blog")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(newBlog)
      .expect(400);
    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length);
  });
});

describe("when a post is gets deleted", () => {
  test("succeeds with status code 204 if id is valid and token is available", async () => {
    const newBlog = new Blog({
      title: "Test blog",
      author: "Test author",
      url: "https://testblog.com/",
      likes: 0,
      user: testUserId,
    });
    const savedBlog = await newBlog.save();

    await api
      .delete(`/api/blog/${savedBlog.id}`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(204);

    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length);
    const titles = blogs.map((r) => r.title);
    expect(titles).not.toContain(savedBlog.title);
  });

  test("user cant delete a note not belong to him", async () => {
    const newBlog = new Blog({
      title: "Test blog",
      author: "Test author",
      url: "https://testblog.com/",
      likes: 0,
      user: "randomuserid",
    });
    const savedBlog = await newBlog.save();

    const result = await api
      .delete(`/api/blog/${savedBlog.id}`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(401);

    expect(result.body.error).toContain("unauthorized user");
  });

  test("fails with status code 401 if token is not available", async () => {
    const dbBlogsBefore = await blogsInDb();
    const blogToDelete = dbBlogsBefore[0];
    const result = await api.delete(`/api/blog/${blogToDelete.id}`).expect(401);
    expect(result.body.error).toContain("token is missing");
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "wrongid";
    const result = await api
      .delete(`/api/blog/${invalidId}`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(400);
    expect(result.body.error).toContain("Malformatted id");
  });
});

describe("when a post gets updated", () => {
  test("updated information is true", async () => {
    const dbBlogsBefore = await blogsInDb();
    const blogToUpdate = dbBlogsBefore[0];
    blogToUpdate.likes = 1200;
    await api
      .put(`/api/blog/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(blogToUpdate)
      .expect(200);

    const dbBlogsAfter = await blogsInDb();
    const updatedBlog = dbBlogsAfter.find(
      (blog) => blog.id === blogToUpdate.id
    );
    expect(updatedBlog.likes).toBe(1200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
