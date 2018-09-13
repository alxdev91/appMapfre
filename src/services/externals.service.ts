import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const TYPE = {
  DNI: 'dni',
  CAR_REGISTRATION: 'matricula',
  DRIVER_DATA: 'datos_parte',
  OPPOSITE_DRIVER: 'datos_matricula'
}
const URL_MAPPER = {}
URL_MAPPER[TYPE.DNI] = 'dni';
URL_MAPPER[TYPE.CAR_REGISTRATION] = 'reconocer_matricula';
URL_MAPPER[TYPE.DRIVER_DATA] = 'datos_parte';
URL_MAPPER[TYPE.OPPOSITE_DRIVER] = 'datos_matricula';

/**
 * Implements the calls to external services, ex: MATRICULA_OCR
 */
@Injectable()
export class ExternalsService {

  constructor(
    private http: HttpClient
  ) { }

  private reconocerImagen(base64: string, type: string, imageName: string): Observable<Object> {

    let url = this.getUrlByType(type);

    let formPart = new FormData();

    let blob: Blob = this.b64toBlob(base64, 'image/jpeg');

    formPart.append('file', blob, `${imageName}.jpeg`);

    let headers = new HttpHeaders();

    return this.http.post(url, formPart, { headers });
  }

  private getUrlByType (type: string):string {
    const subUrl: string = URL_MAPPER[type];
    return `http://neorisdilmx.southcentralus.cloudapp.azure.com/gv/${subUrl}`;
  }

  public reconocerMatrícula(base64: string): Observable<Object> {
    return this.reconocerImagen(base64, TYPE.CAR_REGISTRATION, 'matricula');
  }

  public reconocerDni(base64: string): Observable<Object> {
    return this.reconocerImagen(base64, TYPE.DNI, 'dni');
  }

  public getDatosAsegurado(): Observable<Object> {
    return this.http.get(this.getUrlByType(TYPE.DRIVER_DATA));
  }

  public getDatosParte(matricula: string): Observable<any> {
    return this.http.get<Object>(`${this.getUrlByType(TYPE.OPPOSITE_DRIVER)}?matricula=${matricula}`, {
      observe: 'response',
      responseType: 'json'
    })

  }


  /**
   * Convers a string base64 encoded image to a Binary Large Object by reading each 'real' character byte value
   * @param b64Data
   * @param contentType
   * @param sliceSize
   * @returns {Blob}
   */
  public b64toBlob(b64Data, contentType, sliceSize?): Blob {

    contentType = contentType || '';

    sliceSize = sliceSize || 512;

    //First, get the real characters
    let characters = atob(b64Data);
    let parentByteArrays = [];


    //Slice String representation and add each character byte value in the slice to the byteArray
    for (let offset = 0; offset < characters.length; offset += sliceSize) {

      // for a 512 slice we are calculating each of those 512 characters unicode value as we fill those values into an array
      let slice = characters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      parentByteArrays.push(byteArray);
    }

    let blob = new Blob(parentByteArrays, { type: contentType });
    return blob;
  }

  /**
   * An ugly version of the upper method 'b64toBlob'
   *
   * @param {string} string
   * @returns {Blob}
   */
  btblob(string:string){

    let decodedS = atob(string);

    let ab = new ArrayBuffer(decodedS.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < decodedS.length; i++) {
      ia[i] = decodedS.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab]);
    return bb;
  }







}
