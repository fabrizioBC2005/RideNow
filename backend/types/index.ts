export interface Usuario {
  id:         number;
  nombre:     string;
  email:      string;
  password:   string;
  telefono?:  string;
  direccion?: string;
  rol:        "pasajero" | "conductor" | "admin";
  creado_en:  Date;
}

export interface Conductor {
  id:             number;
  usuario_id:     number;
  licencia:       string;
  vehiculo:       string;
  placa:          string;
  calificacion:   number;
  activo:         boolean;
  creado_en:      Date;
}

export interface Viaje {
  id:           number;
  pasajero_id:  number;
  conductor_id?: number;
  origen:       string;
  destino:      string;
  estado:       "pendiente" | "en_curso" | "completado" | "cancelado";
  precio?:      number;
  creado_en:    Date;
}

export interface Pago {
  id:        number;
  viaje_id:  number;
  monto:     number;
  metodo:    string;
  estado:    "pendiente" | "completado" | "fallido";
  creado_en: Date;
}

export interface TokenPayload {
  id:    number;
  email: string;
  rol:   string;
}
