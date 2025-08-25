export interface PlanillaDetalle {
  identidad_solicitante: string;
  nombre_completo_solicitante: string;
  identidad_fallecido: string;
  nombre_completo_fallecido: string;
  tipo_solicitud: string;
  lugar_acreditacion: string;
  monto: string;
}

export interface Planilla {
  numero_planilla: string;
  fecha_pago_planillas: string;
  pagos_registrados: number;
  monto_pagar_gastos_funebres: string;
  planillas: PlanillaDetalle[];
}
