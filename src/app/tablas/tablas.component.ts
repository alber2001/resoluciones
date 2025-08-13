import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../service/busqueda.service';
import { resolucion } from '../model/resolucion.model';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
})
export class TablasComponent implements OnInit {
  busqueda: string = '';
  resultados: resolucion[] = [];
  todosResoluciones: resolucion[] = [];

  constructor(private busquedaService: BusquedaService) {}

  ngOnInit() {
    this.busquedaService.buscarTodos().subscribe((data) => {
      this.todosResoluciones = data;
      //  console.log(data);
    });
  }

  buscar() {
    const termino = this.busqueda.trim().toLowerCase();
  
    // Si el término está vacío, no ejecutar búsqueda
    if (!termino) {
      this.resultados = []; // Opcional: limpiar resultados
      return;
    }
  
    this.resultados = this.todosResoluciones.filter(
      (d) =>
        d.numero_resolucion.toLowerCase().includes(termino) ||
        d.rivm.toLowerCase().includes(termino)
    );
    console.log(this.resultados);
  }
  

  generatePDF(item?: resolucion) {
    const data: resolucion[] = item ? [item] : this.resultados;
    const documentDefinition = {
      pageSize: { width: 612, height: 936 },
      pageOrientation: 'portrait',
      pageMargins: [76.4, 57, 45, 70.87], // Márgenes personalizados (izquierda, superior, derecha, inferior)
      content: this.documentContent(data),
      styles,
      defaultStyle,
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  documentContent(data: resolucion[]): any[] {
    const content: any[] = [];

    data.forEach((item, index) => {
      const isLast = index == data.length -1;
      const secciones = [
        { text: 'TEGUCIGALPA, M.D.C.', style: 'titulo', lineHeight: 1.3 },
        {
          text: 'VEINTICINCO DE ABRIL DE DOS MIL VEINTICINCO \n',
          style: 'titulo',
          lineHeight: 2.5,
        },
        {
          text: `SEÑOR (A) ${item.solicitante}`, 
          style: 'titulo',
          lineHeight: 1.3,
        },
        {
          text: `DOCUMENTO NACIONAL DE IDENTIFICACIÓN ${item.DNI}. \n`,
          style: 'titulo',
          lineHeight: 2.5,
        },

        {
          text: 'Para su conocimiento y fines legales consiguientes, se transcribe la resolución que literalmente dice: \n\n',
          style: 'titulo',
          alignment: 'justify',
          lineHeight: 1.3,
        },
        {
          text: [
            {
              text: `"RESOLUCION No.${item.numero_resolucion}-RIVM-LA CEIBA.- COMISIÓN INTERVENTORA DEL INSTITUTO HONDUREÑO DE SEGURIDAD SOCIAL, `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'Tegucigalpa, Municipio del Distrito Central, ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'VEINTICINCO DE ABRIL DE DOS MIL VEINTICINCO. VISTA: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'Para resolver la Solicitud No. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `${item.rivm} `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'presentada el ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'veintiseis de septiembre de dos mil veinticuatro, ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'por el (la) señor (a) ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `${item.solicitante} `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'con Documento Nacional de Identificación ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `${item.DNI} `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'contraída a que se le otorgue ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'PENSION POR VEJEZ. CONSIDERANDO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que se reciben las presentes diligencias con los documentos de ' +
                'Ley los cuales son enviados a la Gerencia del Régimen de Invalidez, Vejez y Muerte, para que ' +
                'a través de la Sección Control y Pago de Pensiones se investigue la relación laboral y se ' +
                'efectúe el cálculo de pensión.',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'CONSIDERANDO:',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que se realizó la investigación de salarios ' +
                'en planilla mensual de cotización en la Sub Gerencia de Pensiones, y se constató que el(la) ' +
                'solicitante cuenta con un total de ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: '495 ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'aportaciones al Régimen de Invalidez, Vejez y Muerte del Instituto Hondureño de Seguridad Social. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'CONSIDERANDO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'Que consta en el expediente de mérito que el(la) señor(a) ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `${item.solicitante} `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'reúne el requisito de edad y cotización y que puede optar a la Pensión por Vejez. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'CONSIDERANDO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que la Seguridad ' +
                'Social es un instrumento del Estado al servicio de la Justicia Social, que tiene como finalidad ' +
                'garantizar el derecho humano a la salud, a la asistencia médica, a la protección de los medios ' +
                'de subsistencia y a los servicios sociales necesarios para el logro del bienestar individual y ' +
                'colectivo. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'CONSIDERANDO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que el Instituto a través de la Secretaría General conocerá de las ' +
                'solicitudes, reclamaciones y conflictos referentes a la aplicación de la Ley del Seguro Social, y ' +
                'sus Reglamentos, así como de las controversias que la aplicación de los mismos suscite entre ' +
                'empleadores y asegurados y entre el Instituto y cualquiera de ellos. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'POR TANTO:',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'La Comisión Interventora del Instituto Hondureño de Seguridad Social en uso de las facultades que la Ley le ' +
                'otorga y con fundamento Legal en el Decreto Ejecutivo Número PCM 33-2024 y en los Artículos ' +
                '52 y 88 de la Ley del Seguro Social; 111, 116, 117, 119, 153, 154, 168, 169 y 170 del ' +
                'Reglamento General de la Ley del Seguro Social; 22, 23, 24, 25 y 72 de la Ley de ' +
                'Procedimiento Administrativo; 142 de la Constitución de la República; 99 de la Ley General de ' +
                'la Administración Pública y demás aplicables al caso ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'RESUELVE: DECLARAR CON LUGAR ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'la Pensión por Vejez a favor de ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `${item.solicitante} `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            
            {
              text: 'autorizando a pagar la cantidad de ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: `nueve mil quinientos diecisiete lempiras con 46/100 centavos (L.${item.monto}) `,
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'a partir del ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'veintiseis de septiembre de dos mil veinticuatro, ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'asumiendo la obligación de acreditar su supervivencia semestralmente a requerimiento del Instituto, y ' +
                'notificar el cambio de domicilio en el caso de que se produzca, dando lugar su incumplimiento ' +
                'a la suspensión del goce de la pensión que se le está otorgando. A si mismo se hace de su ' +
                'conocimiento la incompatibilidad del disfrute simultaneo de la pensión por vejez con el de un ' +
                'salario proveniente de una actividad sujeta al Seguro Social. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'MANDA ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que una vez notificada la presente resolución se extienda la respectiva Transcripción al Solicitante, quedando firme si' +
                'dentro del plazo Legal de diez (10) días hábiles no se interpone recurso alguno.-',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'NOTIFIQUESE.- FIRMA Y SELLO ABG. VICTOR MARTINEZ CACERES GERENTE ' +
                'REGIMEN DE INVALIDEZ, VEJEZ Y MUERTE FIRMA DELEGADA MEDIANTE MEMORANDO ' +
                '1583-CI-IHSS-2025."',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
          ],
        },
        {
          text: '\n\nABG. LEONEL OMAR QUIROZ GONZALES',
          style: 'titulo',
          lineHeight: 1.2,
        },
        {
          text: 'SECRETARIO GENERAL IHSS',
          style: 'titulo',
          lineHeight: 1.2,
        },
        {
          text: 'MAJU',
          style: 'tituloN',
          lineHeight: 1.2,
          fontSize: 8,
        },        
      ];
      content.push(...secciones);
      if (!isLast) {
        content.push({ text: '', pageBreak: 'after' });
      }
    });
    
    return content;
  }
}
