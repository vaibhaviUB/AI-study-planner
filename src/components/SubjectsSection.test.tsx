import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SubjectsSection from "./SubjectsSection";

describe("SubjectsSection", () => {
  beforeEach(() => {
    localStorage.clear();
    // @ts-ignore
    if (globalThis.vi) {
      // vitest provides vi globally when running tests
      // mock confirm to avoid modal during tests
      // @ts-ignore
      vi.spyOn(globalThis, "confirm").mockReturnValue(true);
    } else {
      // fallback for other runners
      // @ts-ignore
      globalThis.confirm = () => true;
    }
  });

  afterEach(() => {
    cleanup();
    // restore mock if present
    // @ts-ignore
    if (globalThis.vi) vi.restoreAllMocks();
  });

  it("adds a subject and persists to localStorage", () => {
    render(<SubjectsSection />);

    const nameInput = screen.getByPlaceholderText("Subject name");
    const notesInput = screen.getByPlaceholderText("Short notes (optional)");
    const addBtn = screen.getByText("Add");

    fireEvent.change(nameInput, { target: { value: "Mathematics" } });
    fireEvent.change(notesInput, { target: { value: "Algebra & calculus" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Mathematics")).toBeTruthy();

    const raw = localStorage.getItem("ai_study_planner_subjects");
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw as string);
    expect(parsed.length).toBe(1);
    expect(parsed[0].name).toBe("Mathematics");
  });

  it("edits an existing subject", () => {
    render(<SubjectsSection />);

    const nameInput = screen.getByPlaceholderText("Subject name");
    const addBtn = screen.getByText("Add");

    fireEvent.change(nameInput, { target: { value: "Physics" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Physics")).toBeTruthy();

    const editBtn = screen.getByText("Edit");
    fireEvent.click(editBtn);

    const saveBtn = screen.getByText("Save");
    const editInput = screen.getByPlaceholderText("Subject name");
    fireEvent.change(editInput, { target: { value: "Advanced Physics" } });
    fireEvent.click(saveBtn);

    expect(screen.getByText("Advanced Physics")).toBeTruthy();
  });

  it("deletes a subject", () => {
    render(<SubjectsSection />);

    const nameInput = screen.getByPlaceholderText("Subject name");
    const addBtn = screen.getByText("Add");

    fireEvent.change(nameInput, { target: { value: "Chemistry" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Chemistry")).toBeTruthy();

    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);

    // since confirm is mocked to true, item should be removed
    expect(screen.queryByText("Chemistry")).toBeNull();
  });
});
