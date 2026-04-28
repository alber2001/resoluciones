import { Component, OnInit } from '@angular/core';
import { PlanillaService } from '../service/ayuda.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { fondo_horizontal } from '../files/fondo_horizontal';
import { fondo_2026 } from '../files/fondo_2026';

import { Planilla } from '../model/ayuda.model';

pdfMake.fonts = fonts;

@Component({
  selector: 'app-planilla-ayuda',
  templateUrl: './planilla-ayuda.component.html',
})
export class PlanillaAyudaComponent implements OnInit {
  planillaData!: Planilla;

  constructor(private planillaService: PlanillaService) {}

  ngOnInit(): void {
    this.planillaService.getPlanilla().subscribe((data) => {
      this.planillaData = data;
      console.log('Planilla cargada:', data);
    });
  }

  generarTabla(startIndex: number, endIndex: number) {
    if (!this.planillaData) {
      return [{ text: 'No hay datos disponibles', style: 'normalBold' }];
    } else {
      const body: any[] = [
        [
          { text: 'N°', style: 'normalTablaBold', alignment: 'center' },
          {
            text: 'IDENTIDAD SOLICITANTE',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          {
            text: 'NOMBRE COMPLETO SOLICITANTE',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          {
            text: 'IDENTIDAD FALLECIDO',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          {
            text: 'NOMBRE COMPLETO FALLECIDO',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          {
            text: 'TIPO SOLICITUD',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          {
            text: 'LUGAR ACREDITACIÓN',
            style: 'normalTablaBold',
            alignment: 'center',
          },
          { text: 'MONTO', style: 'normalTablaBold', alignment: 'center' },
        ],
      ];

      this.planillaData.planillas
        .slice(startIndex, endIndex)
        .forEach((p, index) => {
          body.push([
            {
              text: startIndex + index + 1,
              style: 'normalTabla',
              alignment: 'center',
            },
            {
              text: p.identidad_solicitante,
              style: 'normalTabla',
              alignment: 'center',
            },
            {
              text: p.nombre_completo_solicitante,
              style: 'normalTabla',
              alignment: 'left',
            },
            {
              text: p.identidad_fallecido,
              style: 'normalTabla',
              alignment: 'center',
            },
            {
              text: p.nombre_completo_fallecido,
              style: 'normalTabla',
              alignment: 'left',
            },
            {
              text: p.tipo_solicitud,
              style: 'normalTabla',
              alignment: 'center',
            },
            {
              text: p.lugar_acreditacion,
              style: 'normalTabla',
              alignment: 'center',
            },
            { text: `L.${p.monto}`, style: 'normalTabla', alignment: 'right' },
          ]);
        });

      return body;
    }
  }

  documentContent() {
    const content: any[] = [];
    const pageSize = 13; // filas por página
    let startIndex = 0;
    let pageCounter = 0;

    // 🔹 Cabecera de la planilla (primera hoja)
    content.push(
      {
        text: 'INSTITUTO HONDUREÑO DEL SEGURO SOCIAL',
        style: 'cabecera',
        alignment: 'center',
      },
      {
        text: 'RÉGIMEN DE INVALIDEZ, VEJEZ Y MUERTE',
        style: 'cabecera',
        alignment: 'center',
      },
      {
        text: 'SOLICITUD DE AYUDA FUNERARIA\n\n',
        style: 'cabecera',
        alignment: 'center',
      },
      {
        text: [
          {
            text: `NÚMERO DE PLANILLA: ${this.planillaData.numero_planilla}   `,
            style: 'normalBold',
          },
          {
            text: `FECHA DE PAGO: ${this.planillaData.fecha_pago_planillas}                              `,
            style: 'normalBold',
          },
          {
            text: `MONTO A PAGAR: ${this.planillaData.monto_pagar_gastos_funebres}`,
            style: 'normalBold',
          },
        ],
      }
    );

    // 🔹 Tablas de beneficiarios por páginas
    while (startIndex < this.planillaData.planillas.length) {
      const endIndex = Math.min(
        startIndex + pageSize,
        this.planillaData.planillas.length
      );

      content.push({
        table: {
          headerRows: 1,
          widths: [
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
            'auto',
          ],
          body: this.generarTabla(startIndex, endIndex),
          layout: 'lightHorizontalLines',
        },
        style: 'normalTabla',
        margin: pageCounter === 0 ? [0, 0, 0, 0] : [0, 25, 0, 0],
      });

      startIndex = endIndex;
      pageCounter++;

      // 👇 Aquí el cambio:
      // solo hacemos salto de página si quedan registros pendientes
      // (si ya se terminó justo con 13, NO metemos pageBreak)
      if (startIndex < this.planillaData.planillas.length) {
        content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
      }
    }

    // 🔹 Firmas: bloque indivisible
    content.push({
      unbreakable: true,
      margin: [0, -15, 0, 0], // 👈 firmas un poco más arriba
      stack: [
        {
          columns: [
            {
              stack: [
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 180,
                      y2: 0,
                      lineWidth: 1.5,
                      lineColor: 'black',
                    },
                  ],
                },
                {
                  text: 'GERENCIA DE IVM',
                  alignment: 'center',
                  margin: [-150, 5, 0, 0], // espacio entre línea y texto
                  style: 'normalBold',
                },
              ],
            },
            {
              margin: [5, 0, 0, 0],
              stack: [
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 180,
                      y2: 0,
                      lineWidth: 1.5,
                      lineColor: 'black',
                    },
                  ],
                },
                {
                  text: 'SUB- GERENCIA DE PENSIONES',
                  alignment: 'center',
                  margin: [-150, 5, 0, 0],
                  style: 'normalBold',
                },
              ],
            },
          ],
          margin: [120, 70, 0, 0],
        },
      ],
    });

    return content;
  }

  generarPlanilla() {
    if (!this.planillaData) return;

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
}
