
let modelos = {

  "Seat":
    [
      { nombre_modelo: "Leon" },
      { nombre_modelo: "Ateca" },
      { nombre_modelo: "Ibiza" },
      { nombre_modelo: "Alhambra" },
      { nombre_modelo: "Toledo" },
      { nombre_modelo: "Arona" },
    ],
  "Ford":
    [
      { nombre_modelo: "Edge" },
      { nombre_modelo: "Focus" },
      { nombre_modelo: "Fiesta" },
      { nombre_modelo: "Galaxy" },
      { nombre_modelo: "Mondeo" },
      { nombre_modelo: "Kuga" },
    ],
  "Renault":
    [
      { nombre_modelo: "Captur" },
      { nombre_modelo: "Clio" },
      { nombre_modelo: "Espace" },
      { nombre_modelo: "Koleos" },
      { nombre_modelo: "Kadjar" },
      { nombre_modelo: "Mégane" },
    ],
  "Audi":
    [
      { nombre_modelo: "A8" },
      { nombre_modelo: "A7" },
      { nombre_modelo: "A6" },
      { nombre_modelo: "A5" },
      { nombre_modelo: "A4" },
      { nombre_modelo: "A3" },
    ],

}

let permisos = ["AM", "A1", "A2", "A", "B1", "B", "C1", "D1", "D", "BE", "C1E", "CE", "D1E", "DE"];

export class Insured {

  private _nombre: string;
  private _apellidos: string;
  private _dni: string = '12345619R';
  private _direccion: string;
  private _localidad: string;
  private _cp: string;
  private _telefono: string;
  private _recuperar_iva: string;
  private _marca: string;
  private _modelo: string;
  private _matricula: string;
  private _poliza: string;
  private _agencia: string;
  private _c_verde: string;
  private _c_verde_val: string;
  private _d_prop_asegurados: string;
  private _permisos: string;

  constructor() {

    this._permisos = permisos[Math.floor(Math.random() * permisos.length)];

  }

  set nombre(value: string) {
    this._nombre = value;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  set dni(value: string) {
    this._dni = value;
  }

  set direccion(value: string) {
    this._direccion = value;
  }

  set localidad(value: string) {
    this._localidad = value;
  }

  set cp(value: string) {
    this._cp = value;
  }

  set telefono(value: string) {
    this._telefono = value;
  }

  set recuperar_iva(value: string) {
    this._recuperar_iva = value;
  }

  set marca(value: string) {
    this._marca = value;
  }

  set modelo(value: string) {
    this._modelo = value;
  }

  set matricula(value: string) {
    this._matricula = value;
  }

  set poliza(value: string) {
    this._poliza = value;
  }

  set agencia(value: string) {
    this._agencia = value;
  }

  set c_verde(value: string) {
    this._c_verde = value;
  }

  set c_verde_val(value: string) {
    this._c_verde_val = value;
  }

  set d_prop_asegurados(value: string) {
    this._d_prop_asegurados = value;
  }

  set permiso(value: string) {
    this._permisos = value;
  }

  get permiso(): string {
    return this._permisos;
  }

  get nombre(): string {
    return this._nombre;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  get direccion(): string {
    return this._direccion;
  }

  get dni(): string {
    return this._dni;
  }

  get localidad(): string {
    return this._localidad;
  }

  get cp(): string {
    return this._cp;
  }

  get telefono(): string {
    return this._telefono;
  }

  get recuperar_iva(): string {
    return this._recuperar_iva;
  }

  get marca(): string {
    return this._marca;
  }

  get modelo(): string {


    if (this.marca == 'Seat') {
      if (this._modelo != null) {
        return this._modelo;
      }
      return this._modelo = modelos.Seat[Math.floor(Math.random() * 6)].nombre_modelo;
    }
    else if (this.marca == 'Ford') {
      if (this._modelo != null) {
        return this._modelo;
      }
      return this._modelo = modelos.Ford[Math.floor(Math.random() * 6)].nombre_modelo;
    }
    else if (this.marca == 'Renault') {
      if (this._modelo != null) {
        return this._modelo;
      }
      return this._modelo = modelos.Renault[Math.floor(Math.random() * 6)].nombre_modelo;
    }
    else if (this.marca == 'Audi') {
      if (this._modelo != null) {
        return this._modelo;
      }
      return this._modelo = modelos.Audi[Math.floor(Math.random() * 6)].nombre_modelo;
    }
  }

  get matricula(): string {
    return this._matricula;
  }

  get poliza(): string {
    return this._poliza;
  }

  get agencia(): string {
    return this._agencia;
  }

  get c_verde(): string {
    return this._c_verde;
  }

  get c_verde_val(): string {
    return this._c_verde_val;
  }

  get d_prop_asegurados(): string {
    return this._d_prop_asegurados;
  }
}
