import React, { useRef, useEffect } from 'react';

const PopupView = ({ data, closePopup }) => {
  const popupRef = useRef();

  // Detect click outside the popup to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closePopup]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:block md:hidden">
      <div
        ref={popupRef}
        className="relative bg-white w-full max-w-xs h-3/4 rounded-lg overflow-hidden"
      >
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          X
        </button>
        <div className="p-4 h-full w-full overflow-x-auto overflow-y-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Objectives</th>
                <th className="py-2 px-4 border">Outcomes</th>
                <th className="py-2 px-4 border">Functions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 border">{row.id}</td>
                  <td className="py-2 px-4 border">{row.name}</td>
                  <td className="py-2 px-4 border">{row.role}</td>
                  <td className="py-2 px-4 border">{row.objectives}</td>
                  <td className="py-2 px-4 border">{row.outcomes}</td>
                  <td className="py-2 px-4 border">{row.functions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupView;
