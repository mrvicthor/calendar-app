import type { CalendarEvent } from "../types";
function getRandomTimeSlots(count: number) {
  const slots = [];
  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 9) + 8;
    const minute = Math.random() < 0.5 ? "00" : "30";
    const startTime = `${hour.toString().padStart(2, "0")}:${minute}`;
    const endHour = hour + (minute === "30" ? 1 : 0);
    const endMinute = minute === "30" ? "45" : "15";
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute}`;
    slots.push({ startTime, endTime });
  }
  return slots;
}

const baseDate = new Date();

const mockEvents: CalendarEvent[] = [];

for (let i = 0; i < 7; i += 1) {
  const currentDate = new Date(baseDate);
  currentDate.setDate(baseDate.getDate() + i);

  const eventsPerDay = Math.floor(Math.random() * 4) + 2;
  const timeSlots = getRandomTimeSlots(eventsPerDay);
  timeSlots.forEach((slot, index) => {
    mockEvents.push({
      id: `${currentDate.getDate()}-${index}`,
      date: new Date(currentDate),
      title: `Event ${index + 1}`,
      description: `Description fo events ${index + 1}`,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  });
}

export default mockEvents;
