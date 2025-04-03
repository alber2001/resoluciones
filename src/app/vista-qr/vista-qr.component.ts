import { Component, OnInit } from '@angular/core';
import { imageFondo } from '../files/imageFondo';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';

@Component({
  selector: 'app-vista-qr',
  templateUrl: './vista-qr.component.html',
})
export class VistaQrComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  generarpdf() {
    const documentDefinition = {
      pageSize: { width: 612.44, height: 936.24 },
      pageOrientation: 'portrait',
      pageMargins: [85.04, 70.87, 85.04, 70.87], // Márgenes personalizados
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

  documentContent() {
    return [{ qr: '0801-1945-45632', fit: 100, margin: [410, 50, 50, 10] }];
  }
}
