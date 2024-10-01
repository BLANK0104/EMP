import React, { useState, useEffect, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import Popup from "./Popup"; // Import the Popup component

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    formatDate(new Date(), { year: "numeric", month: "long" })
  );
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const calendarRef = useRef(null); // Reference for FullCalendar

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${backendUrl}/calendar`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setCurrentEvents(data); // Set the fetched events into state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const updateCurrentMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    const newDate = calendarApi.getDate();
    setCurrentMonth(formatDate(newDate, { year: "numeric", month: "long" }));
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi(); // Access FullCalendar API
    calendarApi.prev(); // Go to previous month/week/day
    updateCurrentMonth();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next(); // Go to next month/week/day
    updateCurrentMonth();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today(); // Go to today's date
    updateCurrentMonth();
  };

  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view); // Change view to Month, Week, or Day
    updateCurrentMonth();
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const eventDetails = {
      title: event.title,
      clubName: event.extendedProps.clubName,
      facultyCoordinator: event.extendedProps.facultyCoordinator,
      venue: event.extendedProps.venue,
      date: formatDate(event.start, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: formatDate(event.start, { hour: "numeric", minute: "numeric" }),
      eventtype: event.extendedProps.eventtype, // Ensure this matches the backend field
    };
    setSelectedEvent(eventDetails);
  };

  const renderDayHeader = (dayHeader) => {
    return <span className="text-black">{dayHeader.text}</span>;
  };

  return (
    <div className="demo-app mx-auto p-2 md:p-4 lg:p-8 dark:bg-gray-900 dark:text-white">
      <div className="demo-app-main w-full mx-auto h-auto text-xs lg:text-sm">
        {/* Custom Header */}
        <div className="flex flex-col space-y-4">
          {/* Arrow and View Buttons */}
          <div className="flex justify-between">
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={handlePrev}
              >
                Prev
              </button>
              <button
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={() => handleViewChange("dayGridMonth")}
              >
                Month
              </button>
              <button
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={() => handleViewChange("timeGridWeek")}
              >
                Week
              </button>
              <button
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={() => handleViewChange("timeGridDay")}
              >
                Day
              </button>
            </div>
          </div>

          {/* Month, Year, and Today Button */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold lg:text-xl text-black dark:text-white">
              {currentMonth}
            </div>
            <button
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              onClick={handleToday}
            >
              Today
            </button>
          </div>
          {/* Overlay for closing popup when clicking outside */}
          {selectedEvent && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-50"
              onClick={() => setSelectedEvent(null)}
            ></div>
          )}
          {/* Calendar Section */}
          <FullCalendar
            ref={calendarRef} // Attach the ref to FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false} // Disable FullCalendar's default header
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={currentEvents} // Use fetched events here
            eventContent={renderEventContent} // Custom render function
            dayHeaderContent={renderDayHeader} // Custom day header render function
            height="auto" // Automatically adjust height based on content
            className="lg:w-full" // Full width on larger screens
            eventClick={handleEventClick} // Handle event click
          />
        </div>
      </div>
      {selectedEvent && (
        <Popup
          eventDetails={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b className="text-xs lg:text-sm text-black dark:text-white">
        {eventInfo.timeText}
      </b>{" "}
      {/* Smaller font size for mobile, larger for PC */}
      <i className="text-xs lg:text-sm text-black dark:text-white">
        {eventInfo.event.title}
      </i>{" "}
      {/* Same here */}
    </>
  );
}