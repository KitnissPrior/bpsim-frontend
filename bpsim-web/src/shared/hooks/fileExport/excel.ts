import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = (data: [][]) => {
  const workbook = new Workbook();
  const sheet = workbook.addWorksheet('WorkMem');

  if (data.length > 1) {
    data.forEach((row) => {
      sheet.addRow(row);
    });
  }


  workbook.xlsx.writeBuffer()
    .then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'simulation.xlsx');
    });
};