import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';

@Injectable({
  providedIn: 'root'
})

export class ExportExcelService {

  constructor() { }

  exportXLSX(headers: string[], body: {value: string, type: string}[][], nameFile: string){
    const wb = XLSX.utils.book_new();

    const styleHeader = {alignment: {vertical: 'center', horizontal: 'center'}, font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "687CFD" } } };
    const styleRows = {alignment: {vertical: 'center', horizontal: 'center'}, font: { bold: false, color: { rgb: "000000" } }, fill: { fgColor: { rgb: "E2E6FF" } } };
    const styleDateRows = {numFmt:'dd/mm/yyyy',alignment: {vertical: 'center', horizontal: 'center'}, font: { bold: false, color: { rgb: "000000" } }, fill: { fgColor: { rgb: "E2E6FF" } } };

    let rows: any[] = [];
    let row: any[] = [];
    headers.forEach(col => {
      row.push({v: col, t:'s', s: styleHeader});
    });
    rows.push(row);

    body.forEach(rowArr => {
      row = [];
      rowArr.forEach(rowCells => {
        if(rowCells.type === 'string'){
          row.push({v: rowCells.value, t: 's', s: styleRows});
        }
        else{
          row.push({v: rowCells.value, t: 'd', s: styleDateRows});
        }
      })
      rows.push(row);
    });

    let ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    XLSX.writeFile(wb, nameFile+'.xlsx');
  }
}
