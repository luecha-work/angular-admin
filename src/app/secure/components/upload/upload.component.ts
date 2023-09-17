import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  upload(event: any): void {
    let fileName = '';
    const file: File = event.target.files[0];
    // const element = event.currentTarget as HTMLInputElement;

    console.log('file: ', file);

    if (file) {
      fileName = file.name;
      let data = new FormData();

      data.append('image', file);

      this.http
        .post(`${environment.api}/upload`, data)
        .subscribe((res: any) => {
          this.uploaded.emit(res.url);
        });
    }

    // let fileList: FileList | null = element.files;
    // if (fileList) {
    //   console.log('FileUpload -> files', fileList[0]);
    // }
  }
}
