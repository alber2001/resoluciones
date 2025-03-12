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
import { style } from '@angular/animations';

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
        { text: res.expediente, alignment: 'left', style: 'normalTabla' },
        { text: res.solicitante, alignment: 'left', style: 'normalTabla' },
        { text: res.DNI, alignment: 'center', style: 'normalTabla' },
        {
          text: res.monto.toString(),
          alignment: 'right',
          style: 'normalTabla',
        },
        {
          //text: new Date(res.efectividad).toLocaleDateString(),
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

  documentContent() {
    const content = [
      { text: 'RESOLUCIÓN NO. 638-2025-CI-TEGUCIGALPA', style: 'header' },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'COMISIÓN INTERVENTORA DEL INSTITUTO HONDUREÑO DE SEGURIDAD SOCIAL.',
            style: 'normalBold',
          },
          {
            text: ' Tegucigalpa, Municipio del Distrito Central, diecinueve (19) de febrero de dos mil veinticinco (2025).',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que la Seguridad Social es un instrumento del Estado al servicio de la justicia social, que tiene como finalidad garantizar el derecho humano a la salud, a la asistencia médica, a la protección de los medios de subsistencia y a los servicios sociales les necesarios para el logro del bienestar individual y colectivo.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que se establece el Instituto Hondureño de Seguridad  Social, como una Institución de derecho público, que realizara los fines que la ley determine y dentro de los  alcances que la misma y sus reglamentos señalen.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que de conformidad con el artículo 102 de la Ley del Seguro Social, el Instituto dictara los reglamentos que sean necesarios para la más correcta y justa aplicación de la ley.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que se reciben las presentes diligencias con los documentos de Ley los cuales son enviados a la Gerencia del Régimen de Invalidez, Vejez y Muerte, para que a través de la Subgerencia de Pensiones se investiguen las relaciones laborales y se efectúe el cálculo de pensión correspondiente.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que en fecha cuatro (4) de marzo de dos mil veinticinco (2025), según Acta No.  CB-05-2025, el Comité de Beneficios del Régimen de Invalidez, Vejez y  Muerte, después de haber revisado aleatoriamente los expedientes de mérito, pudo comprobar que los (as) solicitantes reúnen los requisitos exigidos en el artículo  116 del Reglamento General de la Ley del Seguro Social, asimismo, pudo comprobar los cálculos  y la fecha de efectividad para el disfrute del beneficio de la',
            style: 'normal',
          },
          {
            text: 'PENSIÓN POR VEJEZ',
            style: 'normalBold',
          },
          {
            text: 'y, recomienda a la Comisión Interventora del Instituto Hondureño de Seguridad Social, proceder a la aprobación  de sesenta y cuatro (64) expedientes relacionados en esta Resolución.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CONSIDERANDO: ',
            style: 'normalBold',
          },
          {
            text: 'Que el Instituto a través de la Secretaría General conocerá de las solicitudes, reclamaciones y conflictos referentes a la aplicación de la Ley del Seguro Social, y sus Reglamentos, así como de las controversias que la aplicación de los mismos suscite entre empleadores y asegurados y entre el Instituto y cualquiera de ellos.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'POR TANTO: ',
            style: 'normalBold',
          },
          {
            text: 'La Comisión Interventora del Instituto Hondureño de Seguridad Social en uso de las Facultades que la ley otorga y con fundamento Legal en el Decreto Ejecutivo número PCM 33-2024 y en los artículos: 52, 74, 75, 76, 77, 88 y 102 de la Ley del Seguro Social; 6, 111, 116, 117, 118, 119, 153, 168, 169, 170 y 174  del Reglamento General de la Ley del Seguro Social; 142 de la Constitución de la República; 22, 23, 24, 25  y 72 de la Ley de Procedimiento Administrativo; 99 de la Ley General de la Administración Pública y; dictámenes que corren agregados a cada uno de los expedientes presentados.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'RESUELVE: PRIMERO: ',
            style: 'normalBold',
            margin: [0, 60, 0, 0],
          },
          {
            text: 'Aprobar los siguientes beneficios de ',
            style: 'normal',
          },
          {
            text: 'PENSIÓN POR VEJEZ,',
            style: 'normalBold',
          },
          {
            text: ' asumiendo los (as) beneficiarios (as), la obligación de acreditar su supervivencia semestralmente a requerimiento del Instituto, y notificar el cambio de domicilio en el caso de que se produzca, dando lugar su incumplimiento a la suspensión del goce de la pensión que se le está otorgando.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: 'BENEFICIO DE PENSIÓN POR VEJEZ',
        style: 'normalBold',
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: this.generarTabla(0, 23),
          layout: 'lightHorizontalLines',
        },
        style: 'normalTabla',
      },
      { text: ' ', pageBreak: 'before', style: 'nada' },
      {
        text: ['\n'],
        style: 'nada',
      },
    ];

    let startIndex = 23;
    const pageSize = 28;

    if (this.resolucion.length > 23) {
      while (startIndex < this.resolucion.length) {
        const endIndex = Math.min(
          startIndex + pageSize,
          this.resolucion.length
        );
        content.push({
          text: ['\n', '\n','\n'],
          style: 'nada',
        },)
        content.push({
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: this.generarTabla(startIndex, endIndex),
            layout: 'lightHorizontalLines',
          },
          style: 'normalTabla',
        });

        startIndex = endIndex;
        if (startIndex < this.resolucion.length) {
          content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
        }else{
          content.push({ text: ' ', pageBreak: 'before', style: 'nada' });
        }
      }
    } 
    content.push(
      {
        text: [
          {
            text: '\n\n\n',
            style: 'nada',
          },
          {
            text: 'SEGUNDO: ',
            style: 'normalBold',
          },
          {
            text: 'Instruir a la Gerencia del Régimen de Invalidez, Vejez para que realice las gestiones correspondientes y aplique los pagos correspondientes a los beneficios aprobados en el resuelve',
            style: 'normal',
          },
          {
            text: ' PRIMERO.',
            style: 'normalBold',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'TERCERO: ',
            style: 'normalBold',
          },
          {
            text: 'Se hace del conocimiento a los (as) solicitantes, la incompatibilidad del disfrute simultáneo de la',
            style: 'normal',
          },
          {
            text: ' PENSIÓN POR VEJEZ ',
            style: 'normalBold',
          },
          {
            text: 'con el de un salario proveniente de una actividad sujeta al Seguro Social.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: 'CUARTO: ',
            style: 'normalBold',
          },
          {
            text: 'La presente resolución es de ejecución inmediata.',
            style: 'normal',
          },
        ],
      },
      {
        text: ['\n'],
        style: 'nada',
      },
      {
        text: [
          {
            text: ' MANDA: ',
            style: 'normalBold',
          },
          {
            text: 'Que la presente resolución sea archivada en el Libro de Resoluciones que para tal efecto lleva y custodia la Gerencia del Régimen de Invalidez, Vejez y Muerte y; una vez notificada la misma, se extienda la respectiva transcripción de la parte correspondiente al solicitante, quedando firme si dentro del término legal establecido de diez (10) días hábiles no se interpone recurso alguno.',
            style: 'normal',
          },
          {
            text: ' NOTIFÍQUESE. ',
            style: 'normalBold',
          },
        ],
      },
      {
        text: ['\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n'],
        style: 'nada',
      },
      {
        text: 'DRA. CARLA MARINA PAREDES REYES',
        style: 'normalBold',
      },
      {
        text: 'PRESIDENTA COMISIÓN INTERVENTORA IHSS',
        style: 'normalBold',
      }
    );
    return content;
  }
}
