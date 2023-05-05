const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  blog ? res.json(blog) : res.status(404).end();
});

blogRouter.post("/", userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const blog = await Blog.findById(id);
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: "unauthorized user" });
  }

  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  res.status(200).json(updatedBlog);
});

module.exports = blogRouter;
