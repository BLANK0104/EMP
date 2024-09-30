import logo from "./logo.jpg";

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
      // Set font size and color for text
      doc.setFontSize(12);
      doc.setTextColor(200); // Lighter text color
      doc.setFontSize(8);

      doc.setFont("helvetica", "bold");
      const lines = [
        "SVKM's NMIMS University",
        "School of Technology Management & Engineering",
        "MPSTME Shirpur Campus",
        "Academic Year: 2024-25",
      ];
      const pageWidth = doc.internal.pageSize.getWidth(); // Define pageWidth
      const centerX = pageWidth / 2; // Calculate center position
      lines.forEach((line, index) => {
        doc.text(line, centerX, 10 + index * 5, { align: "center" });
      });

      resolve();
    };
  });
};
