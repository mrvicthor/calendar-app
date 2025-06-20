import { render, screen, fireEvent } from "@testing-library/react";
import CreateEvent from "../components/create-event";
import { EventsContext } from "../types/events";
import { CalendarContext } from "../types/context";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../hooks/useCalendarContext");
vi.mock("../../hooks/useEventsContext");

describe("CreateEvent", () => {
  const mockToggleModal = vi.fn();
  const mockAddEvent = vi.fn();

  const selectedDate = new Date("2025-06-20");
  const eventModalTime = "09:00";

  const renderComponent = () =>
    render(
      <CalendarContext.Provider
        value={{
          selectedDate,
          toggleModal: mockToggleModal,
          eventModalTime,
        }}
      >
        <EventsContext.Provider
          value={{
            addEvent: mockAddEvent,
            getEventsForDate: () => [],
            getEventsForWeek: () => [],
            viewEvent: false,
            toggleEvent: () => {},
            handleSelectEvent: () => {},
            selectedEvent: null,
            events: [],
          }}
        >
          <CreateEvent />
        </EventsContext.Provider>
      </CalendarContext.Provider>
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

    expect(mockAddEvent).toHaveBeenCalled();
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
