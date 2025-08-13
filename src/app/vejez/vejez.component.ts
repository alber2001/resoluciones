import { Component, OnInit } from '@angular/core';
import { resolucion } from '../model/resolucion.model';
import { ResolucionService } from '../service/resolucion.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { imageFondo } from '../files/imageFondo';
import { resuelveContent } from './resuelve-content';
import { resolucionContent } from './resolucion-content';

@Component({
  selector: 'app-vejez',
  templateUrl: './vejez.component.html',
})
export class VejezComponent implements OnInit {
  constructor(private resolucionService: ResolucionService) {}

  ngOnInit(): void {
    this.obtenerResoluciones();
  }

  resolucion: resolucion[] = [];

  obtenerResoluciones() {
    this.resolucionService.obtenerResolucion().subscribe((data) => {
      this.resolucion = data;
      const cantidadRegistros = this.resolucion.length;
      console.log(cantidadRegistros);
      (error) => {
        console.error('Error al obtener los datos de pensionados', error);
      };
    });
  }

  generarTabla(startIndex: number, endIndex: number) {
    const tabla = [
      [
        { text: 'CASO N°', alignment: 'center', style: 'normalTablaBold' },
        { text: 'EXPEDIENTE', alignment: 'center', style: 'normalTablaBold' },
        { text: 'SOLICITANTE', alignment: 'center', style: 'normalTablaBold' },
        { text: 'DNI', alignment: 'center', style: 'normalTablaBold' },
        { text: 'MONTO', alignment: 'center', style: 'normalTablaBold' },
        { text: 'EFECTIVIDAD', alignment: 'center', style: 'normalTablaBold' },
      ],
    ];

    // Añadir los datos de la tabla entre los índices startIndex y endIndex
    this.resolucion.slice(startIndex, endIndex).forEach((res, index) => {
      tabla.push([
        {
          text: (index + 1 + startIndex).toString(),
          alignment: 'center',
          style: 'normalTabla',
        },
        { text: res.rivm, alignment: 'left', style: 'normalTabla' },
        { text: res.solicitante, alignment: 'left', style: 'normalTabla' },
        { text: res.DNI, alignment: 'center', style: 'normalTabla' },
        {
          text: res.monto.toString(),
          alignment: 'right',
          style: 'normalTabla',
        },
        {
          text: res.efectividad,
          alignment: 'center',
          style: 'normalTabla',
        },
      ]);
    });

    return tabla;
  }

  generatePDF() {
    const documentDefinition = {
      pageSize: { width: 612.44, height: 936.24 },
      pageOrientation: 'portrait',
      pageMargins: [85.04, 70.87, 85.04, 70.87], // Márgenes personalizados (izquierda, superior, derecha, inferior)
      background: {
        image: imageFondo, // Aquí va la imagen en base64
        width: 612.44, // Igual al ancho de la página
        height: 936.24, // Igual al alto de la página
      },
      content: this.documentContent(),
      styles,
      defaultStyle,
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  ///////////////////////////////////////////////////////////////////////inicio de PDF ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  documentContent() {
    const content: any[] = [];

    content.push([
      { text: 'RESOLUCIÓN NO. 638-2025-CI-TEGUCIGALPA', style: 'header' },
    ]);

    content.push(...resolucionContent);

    let startIndex = 23;
    const pageSize = 28;

    if (this.resolucion.length <= 9) {
      content.push({
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: this.generarTabla(0, 9),
          layout: 'lightHorizontalLines', // Aquí se asegura que se usará un layout con líneas horizontales
        },
        style: 'normalTabla', // Aquí defines el estilo de la tabla
      });

      content.push(...resuelveContent);
    } else if (this.resolucion.length > 10 || this.resolucion.length < 23) {
      content.push({
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: this.generarTabla(0, 23),
          layout: 'lightHorizontalLines', // Aquí se asegura que se usará un layout con líneas horizontales
        },
        style: 'normalTabla', // Aquí defines el estilo de la tabla
      });
      content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
      while (startIndex < this.resolucion.length) {
        const endIndex = Math.min(
          startIndex + pageSize,
          this.resolucion.length
        );
        content.push({
          text: ['\n'],
          style: 'nada',
        });
        content.push({
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: this.generarTabla(startIndex, endIndex),
            layout: 'lightHorizontalLines',
          },
          style: 'normalTabla',
        });

        let cantidad = this.resolucion.length - 23;
        let restante = cantidad % 28;

        startIndex = endIndex;
        if (startIndex < this.resolucion.length) {
          content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
        } else if (restante <= 12) {
          content.push({
            text: ['\n'],
            style: 'nada',
          });
        } else {
          content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
        }
      }
      content.push(...resuelveContent);
    }

    return content;
  }
}
