import { Injectable } from "@angular/core";
import { Insured } from "app/classes/Insured";

@Injectable()
export class ParteService {

  private _asegurado: Insured;
  private _contrario: Insured;

  private _matricula_coche_asegurado: string;
  private _matricula_coche_contrario: string;

  private _base64_accidentes: string[];
  private _urlVideoAccidente: string;
  private _url_audioAccidente: string;
  private _path_audioAccidente: string;
  private _audioFileName: string;

  private _parteEnviado: boolean = false;

  public contraryDataFromCaptureImage: boolean = false;

  constructor() {
    this._asegurado = new Insured();
    this._contrario = new Insured();
  }

  public getDatosAsegurado(): string {
    const { nombre, apellidos, dni } = this.asegurado;
    return `DatosAsegurado: ${nombre || ''} - ${apellidos || ''} - ${dni || ''}`;
  }

  public getDatosContrario(): string {
    const { nombre, apellidos, dni } = this.asegurado;
    return `DatosContrario: ${nombre || ''} - ${apellidos || ''} - ${dni || ''}`;
  }

  public getDescripcionAccidenteFinalizada(): string {

    return `DescripcionAccidenteFinalizada: ${this.contrario.nombre || ''},
      ${this.contrario.apellidos || ''}
      ${this.contrario.localidad || ''},
      ${this.contrario.cp || ''},
      ${this.contrario.telefono || ''},
      ${this.contrario.recuperar_iva ? 'Si' : 'No'},
      ${this.contrario.marca || ''},
      ${this.contrario.modelo || ''},
      ${this.contrario.poliza || ''},
      ${this.contrario.agencia || ''},
      ${this.contrario.d_prop_asegurados ? 'Si' : 'No'}`;
  }

  public getNoMeLoDa(): string {
    return 'No me lo da';
  }

  public getPhoneNumber(): string {
    return `Su número de télefono es ${this.contrario.telefono}`;
  }

  public getCapturaFinalizada(): string {
    return 'CapturaFinalizada';
  }

  public getAudioFinalizado(): string {
    return 'AudioFinalizado';
  }

  public updateDatosContrario (response) {
    this.contrario.nombre = response.nombre;
    this.contrario.telefono = response.telefono;
    this.contrario.cp = response.cp;
    this.contrario.poliza = response.poliza;
    this.contrario.d_prop_asegurados = response.d_prop_asegurados;
    this.contrario.c_verde_val = response.c_verde_val;
    this.contrario.c_verde = response.c_verde;
    this.contrario.localidad = response.localidad;
    this.contrario.apellidos = response.apellidos;
    this.contrario.direccion = response.direccion;
    this.contrario.matricula = response.matricula;
    this.contrario.agencia = response.agencia;
    this.contrario.marca = response.marca;
    this.contrario.recuperar_iva = response.recuperar_iva;

    console.log('Contrario: ');
    console.log(this.contrario);
  }

  get url_audioAccidente(): string {
    return this._url_audioAccidente;
  }

  set url_audioAccidente(value: string) {
    this._url_audioAccidente = value;
  }

  get asegurado(): Insured {
    return this._asegurado;
  }

  set asegurado(value: Insured) {
    this._asegurado = value;
  }

  get contrario(): Insured {
    return this._contrario;
  }

  set contrario(value: Insured) {
    this._contrario = value;
  }

  get matricula_coche_asegurado(): string {
    return this._matricula_coche_asegurado;
  }

  set matricula_coche_asegurado(value: string) {
    this._matricula_coche_asegurado = value;
  }

  get matricula_coche_contrario(): string {
    return this._matricula_coche_contrario;
  }

  set matricula_coche_contrario(value: string) {
    this._matricula_coche_contrario = value;
  }

  get base64_accidentes(): string[] {
    return this._base64_accidentes;
  }

  set base64_accidentes(values: string[]) {
    this._base64_accidentes = values;
  }

  get urlVideoAccidente(): string {
    return this._urlVideoAccidente;
  }

  set urlVideoAccidente(value: string) {
    this._urlVideoAccidente = value;
  }

  get path_audioAccidente(): string {
    return this._path_audioAccidente;
  }

  set path_audioAccidente(value: string) {
    this._path_audioAccidente = value;
  }

  get audioFileName(): string {
    return this._audioFileName;
  }

  set audioFileName(value: string) {
    this._audioFileName = value;
  }

  get parteEnviado(): boolean {
    return this._parteEnviado;
  }

  set parteEnviado(value: boolean) {
    this._parteEnviado = value;
  }

  /**
   * CAUTION!! Invoking this method could result on fatal errors in the app data-flow
   */
  reset() {

    this.asegurado = new Insured();
    this.contrario = new Insured();

    this.base64_accidentes = [];
    this.parteEnviado = false;
    this.path_audioAccidente = '';
    this.url_audioAccidente = '';
    this.audioFileName = '';
    this.matricula_coche_asegurado = '';
    this.matricula_coche_contrario = '';

  }
}
