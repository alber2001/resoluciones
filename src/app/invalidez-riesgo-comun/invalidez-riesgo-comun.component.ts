import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../service/busqueda.service';
import { resolucion } from '../model/resolucion.model';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from '../../assets/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
import { fonts } from '../config/pdfFonts';
import { styles, defaultStyle } from '../config/customStyle';
import { style } from '@angular/animations';

@Component({
  selector: 'app-invalidez-riesgo-comun',
  templateUrl: './invalidez-riesgo-comun.component.html',
  styleUrls: ['./invalidez-riesgo-comun.component.css'],
})
export class InvalidezRiesgoComunComponent implements OnInit {
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

  Cantidad = 0;

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
    this.Cantidad = this.resultados.length;
  }

  generatePDF(item?: resolucion) {
    const data: resolucion[] = item ? [item] : this.resultados;
    const documentDefinition = {
      pageSize: { width: 612, height: 936 },
      pageOrientation: 'portrait',
      pageMargins: [76.4, 25, 45, 35], // Márgenes personalizados (izquierda, superior, derecha, inferior)
      content: this.documentContent(data),
      styles,
      defaultStyle,
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  documentContent(data: resolucion[]): any[] {
    const content: any[] = [];

    data.forEach((item, index) => {
      const isLast = index == data.length - 1;
      const secciones = [
        { text: 'TEGUCIGALPA, M.D.C.', style: 'titulo', lineHeight: 1.3 },
        {
          text: 'VEINTICINCO DE ABRIL DE DOS MIL VEINTICINCO \n',
          style: 'titulo',
          lineHeight: 2,
        },
        {
          text: `SEÑOR(A) ${item.solicitante}`,
          style: 'titulo',
          lineHeight: 1.3,
        },
        {
          text: `DOCUMENTO NACIONAL DE IDENTIFICACIÓN ${item.DNI}. \n`,
          style: 'titulo',
          lineHeight: 2,
        },

        {
          text: 'Para su conocimiento y fines legales consiguientes, se transcribe la resolución que literalmente dice: \n',
          style: 'titulo',
          alignment: 'justify',
          lineHeight: 1.3,
        },
        {
          text: [
            {
              text: `"RESOLUCIÓN No.${item.numero_resolucion}-RIVM-LA CEIBA.- DIRECCIÓN EJECUTIVA, `,
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
              text: 'VEINTICINCO DE ABRIL DE DOS MIL VEINTICINCO. ',
              style: 'titulo',
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
                'Que la Seguridad Social es un instrumento del Estado al servicio de la justicia ' +
                'social, que tiene como finalidad garantizar el derecho humano a la salud, a la asistencia médica, a ' +
                'la protección de los medios de subsistencia y a los servicios sociales necesarios para el logro ' +
                'del bienestar individual y colectivo. ',
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
                'Que se establece el Instituto Hondureño de Seguridad Social, como una ' +
                'Institución de derecho público, que realizará los fines que la ley determine y dentro de los alcances ' +
                'que la misma y sus reglamentos señalen. ',
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
                'Que, de conformidad con el artículo 102 de la Ley del Seguro Social, el Instituto ' +
                'dictará los reglamentos que sean necesarios para la más correcta y justa aplicación de la ley. ',
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
                'Que se reciben las presentes diligencias con los documentos de ley, los cuales ' +
                'son enviados a la Gerencia del Régimen de Invalidez, Vejez y Muerte, para que, a través de la ' +
                'Subgerencia de Pensiones, se investiguen las relaciones laborales y se efectúe el cálculo de pensión correspondiente. ',
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
              text: 'Que en fecha cuatro (4) de marzo de dos mil veinticinco (2025), según Acta No. CB-05-2025, el Comité de Beneficios del Régimen de Invalidez, Vejez y Muerte, después de haber revisado aleatoriamente los expedientes de mérito y los Dictámenes Médicos emitidos por la Comisión Técnica e Invalidez, se pudo comprobar que los (as) solicitantes reúnen los requisitos exigidos en los artículos 105 y 110 del Reglamento General de la Ley del Seguro Social. Asimismo, pudo comprobar los cálculos emitidos conforme a lo dispuesto en el artículo 111 del Reglamento General de la Ley del Seguro Social y la fecha de efectividad para el goce del beneficio de la ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },

            {
              text: 'PENSIÓN POR INVALIDEZ ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'observando lo establecido en el artículo 109 del mismo Reglamento y, recomienda a la Dirección Ejecutiva del Instituto Hondureño del seguro social, proceder a la aprobación de sesenta y cuatro (' +
                `${this.Cantidad}` +
                ') expedientes relacionados en esta resolución. ',
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
                'Que el Instituto a través de la Secretaría General conocerá de las solicitudes, ' +
                'reclamaciones y conflictos referentes a la aplicación de la Ley del Seguro Social, y sus ' +
                'Reglamentos, así como de las controversias que la aplicación de los mismos suscite entre ' +
                'empleadores y asegurados y entre el Instituto y cualquiera de ellos. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'POR TANTO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'Dirección ejecutiva, en uso de las facultades que la ley le otorga y con fundamento legal en Los artículos 74, 75, 76, 77 y 102 de la Ley del Seguro Social; 105, 106, 107, 109, 110, 111, 153 y 174 del Reglamento General de la Ley del Seguro Social; 142 de la Constitución de la Republica; 22, 23, 24, 25 y 72 de la Ley de Procedimiento Administrativo y; dictámenes que corren agregados a cada uno de los expedientes presentados. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'RESUELVE: PRIMERO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'Aprobar los siguientes beneficios de ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'PENSIÓN POR INVALIDEZ, ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'asumiendo los(as) beneficiarios(as), la obligación de acreditar su supervivencia semestralmente a ' +
                'requerimiento del Instituto, y notificar el cambio de domicilio en el caso de que se produzca, dando ' +
                'lugar su incumplimiento a la suspensión del goce de la pensión que se le está otorgando. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'BENEFICIO DE PENSIÓN POR INVALIDEZ ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
          ],
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                {
                  text: 'N°',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
                {
                  text: 'EXPEDIENTE',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
                {
                  text: 'SOLICITANTE',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
                { text: 'DNI', alignment: 'center', style: 'normalTablaBold' },
                {
                  text: 'RIESGO',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
                {
                  text: 'MONTO',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
                {
                  text: 'EFECTIVIDAD',
                  alignment: 'center',
                  style: 'normalTablaBold',
                },
              ],
              [
                { text: '1', alignment: 'center', style: 'tituloS' },
                { text: `${item.rivm}`, alignment: 'center', style: 'tituloS' },
                {
                  text: `${item.solicitante}`,
                  alignment: 'left',
                  style: 'tituloS',
                },
                {
                  text: `${item.DNI}`,
                  alignment: 'center',
                  style: 'tituloS',
                },
                {
                  text: `ENFERMEDAD COMÚN`,
                  alignment: 'center',
                  style: 'tituloS',
                },
                {
                  text: `${item.monto}`,
                  alignment: 'right',
                  style: 'tituloS',
                },
                {
                  text: `${item.efectividad}`,
                  alignment: 'center',
                  style: 'tituloS',
                },
              ],
            ],
          },
        },

        {
          text: [
            {
              text: 'SEGUNDO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Instruir a la Gerencia del Régimen de Invalidez, Vejez para que realice las gestiones ' +
                'correspondientes y aplique los pagos correspondientes a los beneficios aprobados en el resuelve ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'PRIMERO. ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'TERCERO: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'La presente resolución es de ejecución inmediata. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'MANDA: ',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text:
                'Que la presente resolución sea archivada en el Libro de Resoluciones que para tal efecto ' +
                'lleva y custodia la Gerencia del Régimen de Invalidez, Vejez y Muerte y; una vez notificada la ' +
                'misma, se extienda la respectiva transcripción de la parte correspondiente al solicitante, quedando ' +
                'firme si dentro del término legal establecido de diez (10) días hábiles no se interpone recurso ' +
                'alguno. ',
              style: 'tituloN',
              alignment: 'justify',
              lineHeight: 1.3,
            },
            {
              text: 'NOTIFIQUESE.',
              style: 'titulo',
              alignment: 'justify',
              lineHeight: 1.3,
            },
          ],
        },
        {
          text: '\nABG. LEONEL OMAR QUIROZ GONZALES',
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
