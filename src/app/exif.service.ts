import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExifService {

  private readonly rotation = {
    1: 'rotate(0deg)',
    3: 'rotate(180deg)',
    6: 'rotate(90deg)',
    8: 'rotate(270deg)'
  };

  constructor() { }

  private arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  getExif(f: File): Promise<any> {
    const p = new Promise((resolve, reject) => {

      if (!f) {
        reject('No file provided');
      } else {

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          const base64img = 'data:' + f.type + ';base64,' + this.arrayBufferToBase64(fileReader.result);
          const scanner = new DataView(fileReader.result as any);

          let idx = 0;
          let value = 1; // Non-rotated is the default

          if ((fileReader.result as any).length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
            // Not a JPEG
            reject('File must be a jpeg!');
          }

          if ((fileReader.result as any).length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
            // Not a JPEG
            reject(value);
          }

          idx += 2;
          let maxBytes = scanner.byteLength;

          while (idx < maxBytes - 2) {

            const uint16 = scanner.getUint16(idx);
            idx += 2;

            switch (uint16) {

              case 0xFFE1: // Start of EXIF
                const exifLength = scanner.getUint16(idx);
                maxBytes = exifLength - idx;
                idx += 2;
                break;

              case 0x0112: // Orientation tag
                // Read the value, its 6 bytes further out
                // See page 102 at the following URL
                // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
                value = scanner.getUint16(idx + 6, false);
                maxBytes = 0; // Stop scanning
                console.log('Exif value found, stopping scan:', value);
                break;
            }
          }

          resolve({ img: base64img, transform: this.rotation[value] });
        };

        fileReader.readAsArrayBuffer(f);
      }
    });

    return p;
  }
}
