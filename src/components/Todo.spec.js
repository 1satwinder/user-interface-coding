import { mount } from "@vue/test-utils";
import { describe, test, expect, beforeEach } from "vitest";
import Todo from "./TodoList.vue"; // Adjust the path as needed

describe("Todo.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Todo);
  });

  test("renders input and button", () => {
    const input = wrapper.find("input#todo-input");
    const button = wrapper.find("button");

    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Add To List");
  });

  test("adds a todo on button click", async () => {
    const input = wrapper.find("input#todo-input");
    await input.setValue("Buy milk");

    await wrapper.find("button").trigger("click");

    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("Buy milk");
  });

  test("clears input after adding a todo", async () => {
    const input = wrapper.find("input#todo-input");
    await input.setValue("Walk dog");

    await wrapper.find("button").trigger("click");

    expect(input.element.value).toBe("");
  });

  test("adds a todo on Enter key press", async () => {
    const input = wrapper.find("input#todo-input");
    await input.setValue("Read book");

    await input.trigger("keydown.enter");

    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("Read book");
  });

  test("does not add empty todo", async () => {
    const input = wrapper.find("input#todo-input");
    await input.setValue("   "); // spaces only
    await wrapper.find("button").trigger("click");

    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(0);
  });

  test("deletes a todo item", async () => {
    const input = wrapper.find("input#todo-input");
    await input.setValue("Do laundry");
    await wrapper.find("button").trigger("click");

    // Ensure it's added
    expect(wrapper.findAll("li").length).toBe(1);

    // Delete
    await wrapper.find("li button").trigger("click");

    expect(wrapper.findAll("li").length).toBe(0);
  });
});
