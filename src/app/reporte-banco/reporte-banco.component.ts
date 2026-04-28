import { bancos } from './../model/banco.model';
import { Component, OnInit } from '@angular/core';

import { fondo_2026 } from '../files/fondo_2026';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { BancosService } from '../service/bancos.service';

@Component({
  selector: 'app-reporte-banco',
  templateUrl: './reporte-banco.component.html',
  styleUrls: ['./reporte-banco.component.css'],
})
export class ReporteBancoComponent implements OnInit {
  busqueda: string = '';
  resultados: bancos[] = [];
  todosBancos: bancos[] = [];

  constructor(private bancosService: BancosService) {}

  ngOnInit(): void {
    this.bancosService.getBancos().subscribe((data) => {
      this.resultados = data;
    });
  }

  generatePDF() {
    const documentDefinition = {
      pageSize: { width: 612, height: 936 }, // 8.5 x 13 pulgadas (Oficio)
      pageOrientation: 'landscape',
      pageMargins: [72, 72, 72, 72], // 1" en cada lado
      content: this.documentContent(),
      styles,
      defaultStyle,
      background: [
        {
          image: fondo_2026,
          width: 339,
          height: 78,
          margin: [290, -2, 0, 0],
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  documentContent() {
    const periodo = this.resultados.length ? this.resultados[0].periodo : '';

    const fecha = new Date(periodo);
    const periodoFormateado =
      String(fecha.getMonth() + 1).padStart(2, '0') + '-' + fecha.getFullYear();

    const body = [
      [
        { text: 'CUANTOS', alignment: 'center', style: 'normalTablaBold', fontSize: 10 },
        { text: 'REGIMEN', alignment: 'center', style: 'normalTablaBold', fontSize: 10 },
        { text: 'AREA-ID', alignment: 'center', style: 'normalTablaBold' , fontSize: 10},
        { text: 'AREA', alignment: 'center', style: 'normalTablaBold' , fontSize: 10},
        { text: 'BANCO', alignment: 'center', style: 'normalTablaBold' , fontSize: 10},
        { text: 'COMISIÓN', alignment: 'center', style: 'normalTablaBold' , fontSize: 10},
        {
          text: 'TOTAL COMISIÓN',
          alignment: 'center',
          style: 'normalTablaBold',
          fontSize: 10
        },
        { text: 'MONTO PAGAR', alignment: 'center', style: 'normalTablaBold', fontSize: 10 },
      ],
    ];

    this.resultados.forEach((r) => {
      body.push([
        { text: `${r.cuantos}`, alignment: 'left', style: 'normalTablaBold' , fontSize: 10},
        { text: `${r.regimen}`, alignment: 'center', style: 'normalTablaBold', fontSize: 10 },
        { text: `${r.area_id}`, alignment: 'left', style: 'normalTablaBold', fontSize: 10 },
        { text: `${r.area}`, alignment: 'left', style: 'normalTablaBold', fontSize: 10 },
        { text: `${r.banco}`, alignment: 'center', style: 'normalTablaBold' , fontSize: 10},
        { text: `${r.comision}`, alignment: 'right', style: 'normalTablaBold', fontSize: 10 },
        {
          text: `L. ${r.total_comision.toLocaleString('es-HN')}`,
          alignment: 'right',
          style: 'normalTablaBold',
          fontSize: 10
        },
        {
          text: `L. ${r.monto_pagar.toLocaleString('es-HN')}`,
          alignment: 'right',
          style: 'normalTablaBold',
           fontSize: 10
        },
      ]);
    });

    return [
      {
        text: 'Régimen de Invalidez Vejez y Muerte \n',
        alignment: 'center',
        style: 'normalTablaBold',
        fontSize: 12,
      },
      {
        text: `Resumen Occidente ${periodoFormateado} \n\n`,
        alignment: 'center',
        style: 'normalTablaBold',
        fontSize: 12,
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: body,
        },
      },
    ];
  }
}
