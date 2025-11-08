import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadCvAsPdf = async (elementId: string, fileName: string): Promise<void> => {
    // The element to capture
    const element = document.getElementById(elementId) as HTMLElement;
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        alert("Error: Could not find CV element to download.");
        return;
    }

    // Use html2canvas to draw the element to a canvas
    const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 page dimensions in mm
    const a4Width = 210;
    const a4Height = 297;
    
    // Create a new PDF instance
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate the image dimensions to fit the PDF page width
    const ratio = canvasHeight / canvasWidth;
    const imgWidth = a4Width;
    const imgHeight = imgWidth * ratio;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= a4Height;
    
    // Add more pages if the content is taller than a single A4 page
    while (heightLeft > 0) {
        position -= a4Height;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= a4Height;
    }
    
    // Save the PDF
    pdf.save(`${fileName}.pdf`);
};
