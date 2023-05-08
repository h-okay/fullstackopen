import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("<Blog /> renders title and author by default but not url and likes", async () => {
  const mockHandler = jest.fn();
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
    likes: 0,
    user: {
      name: "Test User",
    },
  };

  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />
  );

  const title = container.querySelector(".blogTitle");
  const author = container.querySelector(".blogAuthor");
  const url = container.querySelector("#url");
  const likes = container.querySelector("#likes");
  const username = container.querySelector("#username");

  expect(title).toBeDefined();
  expect(title).toBeVisible();
  expect(title).toHaveTextContent("Test Title");
  expect(author).toBeDefined();
  expect(author).toBeVisible();
  expect(author).toHaveTextContent("Test Author");
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
  expect(username).not.toBeVisible();
});

test("'click view button and can see blog detail", async () => {
  const handleLike = jest.fn();
  const handleRemove = jest.fn();
  const user = userEvent.setup();
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
    likes: 0,
    user: {
      name: "Test User",
    },
  };

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
  );

  const button = component.getByText("details");
  await user.click(button);

  const togglableContent =
    component.container.querySelector(".togglableContent");
  expect(togglableContent).toBeDefined();
  expect(togglableContent).toBeVisible();
  expect(togglableContent).toHaveTextContent("Test URL");
  expect(togglableContent).toHaveTextContent("Likes: 0");
  expect(togglableContent).toHaveTextContent("Added by: Test User");
});

test("2 calls made to the API when like button clicked twice", async () => {
  const handleLike = jest.fn();
  const handleRemove = jest.fn();
  const user = userEvent.setup();
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
    likes: 0,
    user: {
      name: "Test User",
    },
  };

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
  );

  const button = component.getByText("details");
  await user.click(button);

  const likeButton = component.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(handleLike).toHaveBeenCalledTimes(2);
});
