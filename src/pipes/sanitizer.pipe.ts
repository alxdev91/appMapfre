import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class SanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string, args: string): any {
    console.log(args + value + " <-- requested URL -- Bypassing Sanitize")
    let src = this.domSanitizer.bypassSecurityTrustResourceUrl(args + value);
    return src;
  }

}
