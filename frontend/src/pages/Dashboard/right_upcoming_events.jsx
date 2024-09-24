import React from "react";

const RightUpcomingEvents = ({ events }) => {
  return (
    <div className="w-full md:w-8/12 h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Booked Events
      </h3>
      <div className="overflow-y-auto h-80">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-center text-gray-900 dark:text-gray-100">
                Event
              </th>
              <th className="p-2 text-center text-gray-900 dark:text-gray-100">
                Organizer
              </th>
              <th className="p-2 text-center text-gray-900 dark:text-gray-100">
                Time
              </th>
              <th className="p-2 text-center text-gray-900 dark:text-gray-100">
                Date
              </th>
              <th className="p-2 text-center text-gray-900 dark:text-gray-100">
                Venue
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={event.event_id}
                className={`border-t rounded-xl mt-1 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="p-2 text-wrap text-center text-gray-900 dark:text-gray-100">
                  {event.event_title}
                </td>
                <td className="p-2 text-wrap text-center text-gray-900 dark:text-gray-100">
                  {event.organizer}
                </td>
                <td className="p-2 text-wrap text-center text-gray-900 dark:text-gray-100">
                  {event.start_time}
                </td>
                <td className="p-2 text-wrap text-center text-gray-900 dark:text-gray-100">
                  {event.event_date_range}
                </td>
                <td className="p-2 text-wrap text-center text-gray-900 dark:text-gray-100">
                  {event.venue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightUpcomingEvents;
