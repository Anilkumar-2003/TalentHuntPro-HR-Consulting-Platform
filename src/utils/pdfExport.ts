import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportDashboardAsPDF = async () => {
  const dashboardElement = document.getElementById('dashboard-metrics');
  if (!dashboardElement) return;

  try {
    const canvas = await html2canvas(dashboardElement, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('dashboard-metrics.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};