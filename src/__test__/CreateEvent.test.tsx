import { render, screen, fireEvent } from "@testing-library/react";
import CreateEvent from "../components/create-event";
import { EventsContext } from "../types/events";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockToggleModal = vi.fn();
const mockAddEvent = vi.fn();

vi.mock("../hooks/useCalendarContext", () => ({
  useCalendarContext: () => ({
    selectedDate: new Date("2025-06-20"),
    toggleModal: mockToggleModal,
    eventModalTime: "09:00",
  }),
}));

describe("CreateEvent", () => {
  // Create a minimal events context value
  const eventsContextValue = {
    addEvent: mockAddEvent,
    getEventsForDate: vi.fn(() => []),
    getEventsForWeek: vi.fn(() => []),
    viewEvent: false,
    toggleEvent: vi.fn(),
    handleSelectEvent: vi.fn(),
    selectedEvent: null,
    events: [],
  };

  const renderComponent = () =>
    render(
      <EventsContext.Provider value={eventsContextValue}>
        <CreateEvent />
      </EventsContext.Provider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the CreateEvent modal", () => {
    renderComponent();
    expect(screen.getByText(/add event/i)).toBeInTheDocument();
  });

  it("displays validation error when end time is earlier than start time", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/add title/i), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/start time/i), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/end time/i), {
      target: { value: "09:00" },
    });
    fireEvent.click(screen.getByText(/save event/i));

    expect(
      screen.getByText(/start time must be earlier than end time/i)
    ).toBeInTheDocument();
    expect(mockAddEvent).not.toHaveBeenCalled();
  });

  it("calls addEvent on valid submit", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/add title/i), {
      target: { value: "Meeting" },
    });
    fireEvent.change(screen.getByLabelText(/start time/i), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText(/end time/i), {
      target: { value: "10:00" },
    });
    fireEvent.click(screen.getByText(/save event/i));

    expect(mockAddEvent).toHaveBeenCalledWith({
      title: "Meeting",
      date: new Date("2025-06-20"),
      startTime: "09:00",
      endTime: "10:00",
      description: "",
    });
    expect(mockToggleModal).toHaveBeenCalled();
  });

  it("closes modal when cancel button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/cancel/i));
    expect(mockToggleModal).toHaveBeenCalled();
  });

  it("closes modal when escape key is pressed", () => {
    renderComponent();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(mockToggleModal).toHaveBeenCalled();
  });

  it("does not submit when title is empty", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/save event/i));
    expect(mockAddEvent).not.toHaveBeenCalled();
  });

  it("clears time error when time inputs are changed", () => {
    renderComponent();

    // First create the error
    fireEvent.change(screen.getByPlaceholderText(/add title/i), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/start time/i), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/end time/i), {
      target: { value: "09:00" },
    });
    fireEvent.click(screen.getByText(/save event/i));

    expect(
      screen.getByText(/start time must be earlier than end time/i)
    ).toBeInTheDocument();

    // Then fix the time and verify error is cleared
    fireEvent.change(screen.getByLabelText(/end time/i), {
      target: { value: "11:00" },
    });

    expect(
      screen.queryByText(/start time must be earlier than end time/i)
    ).not.toBeInTheDocument();
  });

  it("includes description when provided", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/add title/i), {
      target: { value: "Meeting" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Important meeting" },
    });
    fireEvent.click(screen.getByText(/save event/i));

    expect(mockAddEvent).toHaveBeenCalledWith({
      title: "Meeting",
      date: new Date("2025-06-20"),
      startTime: "09:00",
      endTime: "10:00",
      description: "Important meeting",
    });
  });
});
