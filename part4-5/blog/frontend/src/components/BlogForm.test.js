import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<BlogForm createBlog={createBlog} />);

  const inputFields = component.getAllByRole("textbox");
  const sendButton = component.getByText("create");

  await user.type(inputFields[0], "testing title input...");
  await user.type(inputFields[1], "testing author input...");
  await user.type(inputFields[2], "testing url input...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing title input...");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author input...");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url input...");
});

test("While creating a new blog event handler called with correct props", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<BlogForm createBlog={createBlog} />);
  const inputFields = component.getAllByRole("textbox");
  const sendButton = component.getByText("create");
  await user.type(inputFields[0], "testing title input...");
  await user.type(inputFields[1], "testing author input...");
  await user.type(inputFields[2], "testing url input...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBeDefined();
  expect(createBlog.mock.calls[0][0].author).toBeDefined();
  expect(createBlog.mock.calls[0][0].url).toBeDefined();
  expect(createBlog.mock.calls[0][0].title).toBe("testing title input...");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author input...");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url input...");
});
