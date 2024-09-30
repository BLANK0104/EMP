import logo from "./logo.jpg";
import { useState, useEffect } from "react";

const clubLogos = {};
const importAll = (r) => {
  Object.keys(r).forEach(async (key) => {
    const module = await r[key]();
    clubLogos[key] = module.default;
  });
};
importAll(
  import.meta.glob("../../../../public/Club_logo/*.{png,jpg,jpeg,svg}")
);
const csiLogo = clubLogos["../../../../public/Club_logo/Computer Society of India (CSI).jpg"];

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const App = () => {
  const [data, setData] = useState([]);
  const [currentClub, setCurrentClub] = useState("");

 useEffect(() => {
  fetch(`${backendUrl}/current-club`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setCurrentClub(data.username);
    })
    .catch((error) => console.error("Error fetching current user:", error));
  console.log("Current User:", currentClub);
}, []);
};

export const PdfHeader = (doc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Draw the original logo
      doc.addImage(img, "JPEG", 10, 10, 60, 20);

      const drawMiddleLogo = () => {
        // Enlarge and lighten the logo, then place it in the middle of the page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const enlargedWidth = 100; // Adjust the size as needed
        const enlargedHeight = 50; // Adjust the size as needed
        doc.setGState(new doc.GState({ opacity: 0.2 })); // Lighten the image
        doc.addImage(
          img,
          "JPEG",
          (pageWidth - enlargedWidth) / 2,
          (pageHeight - enlargedHeight) / 2,
          enlargedWidth,
          enlargedHeight
        );
        doc.setGState(new doc.GState({ opacity: 1 })); // Reset opacity
      };

      // Draw the middle logo on the first page
      drawMiddleLogo();

      // Add event listener for new pages
      doc.internal.events.subscribe("addPage", drawMiddleLogo);

      // Set font size and color for text
      doc.setFontSize(12);
      doc.setTextColor(200); // Lighter text color
      doc.setFontSize(8);

      doc.setFont("helvetica", "bold");

      // Fetch the current club name from the server
      fetch(`${backendUrl}/current-club`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const currentClub = data.club;

          const lines = [
            "SVKM's NMIMS University",
            "School of Technology Management & Engineering",
            "MPSTME Shirpur Campus",
            "Academic Year: 2024-25",
            `Current Club: ${currentClub}`, // Add the current club name here
          ];
          const pageWidth = doc.internal.pageSize.getWidth(); // Define pageWidth
          const centerX = pageWidth / 2; // Calculate center position
          lines.forEach((line, index) => {
            doc.text(line, centerX, 10 + index * 5, { align: "center" });
          });

          // Draw the imported logo on the right side
          const rightLogo = new Image();
          rightLogo.src = csiLogo;
          rightLogo.onload = () => {
            const rightLogoWidth = 60; // Adjust the size as needed
            const rightLogoHeight = 20; // Adjust the size as needed
            const pageWidth = doc.internal.pageSize.getWidth();
            doc.addImage(
              rightLogo,
              "PNG",
              pageWidth - rightLogoWidth - 10,
              10,
              rightLogoWidth,
              rightLogoHeight
            );
          };

          resolve();
        })
        .catch((error) => {
          console.error("Error fetching current club:", error);
          resolve();
        });
    };
  });
};