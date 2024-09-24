import React, { useEffect, useState } from "react";
import History from "./History.jsx";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/history", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // const addHistoryEntry = (entry) => {
  //   fetch("http://localhost:5000/api/history", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(entry),
  //   })
  //     .then((response) => response.json())
  //     .then((newEntry) => setData([...data, newEntry]))
  //     .catch((error) => console.error("Error adding entry:", error));
  // };

  return (
    <div>
      <History data={data} />
      {/* Add a form or button to call addHistoryEntry with new data */}
    </div>
  );
};

export default App;
