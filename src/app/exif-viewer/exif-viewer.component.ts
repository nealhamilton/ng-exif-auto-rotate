import { Component, OnInit, ViewChild } from '@angular/core';
import { ExifService } from '../exif.service';

@Component({
  selector: 'app-exif-viewer',
  templateUrl: './exif-viewer.component.html',
  styleUrls: ['./exif-viewer.component.scss']
})
export class ExifViewerComponent implements OnInit {
  @ViewChild('file', {
    static: false,
    read: false
  }) file;

  res: any;

  constructor(
    private exif: ExifService
  ) { }

  ngOnInit() {
  }

  fileChangeHandler() {
    const fileList: FileList = this.file.nativeElement.files;

    if (fileList.length) {
      this.exif.getExif(fileList.item(0)).then(res => {
        this.res = res;
      }, err => {
        console.log(err);
      });
    }
  }

}
