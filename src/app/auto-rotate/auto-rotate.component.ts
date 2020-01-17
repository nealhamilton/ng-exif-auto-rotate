import { Component, OnInit, ViewChild } from '@angular/core';
import { ExifService } from '../exif.service';

@Component({
  selector: 'app-auto-rotate',
  templateUrl: './auto-rotate.component.html',
  styleUrls: ['./auto-rotate.component.scss']
})

export class AutoRotateComponent implements OnInit {
  @ViewChild('file', {
    static: false,
    read: false
  }) file;

  res: any;
  error: string;

  constructor(
    private exif: ExifService
  ) { }

  ngOnInit() {
  }

  fileChangeHandler() {
    this.error = null;

    const fileList: FileList = this.file.nativeElement.files;

    if (fileList.length) {
      this.exif.getExif(fileList.item(0)).then(res => {
        this.res = res;
      }, err => {
        this.error = err;
      });
    }
  }

}
