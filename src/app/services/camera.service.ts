import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { VisionService } from './vision.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private camera: Camera, private storage: AngularFireStorage, private visionService: VisionService) {
  }

  getPicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = imageData;
      if (localStorage.getItem('currentUser')) {
        this.uploadFile(this.getBlob(imageData, 'image/png', 512));
      }

      // this.createHTTP(imageData);
      this.visionService.getData(base64Image).subscribe((result: any) => {
        console.log(JSON.stringify(result.responses));
      }, err => {
        console.log(err);

        // this.showAlert(err);
      });
    }, (err) => {
      console.log(err);

      // Handle error
    });
  }

  // createHTTP(base64Image) {
  //   const body = {
  //     'requests': [
  //       {
  //         'image': {
  //           'content': base64Image
  //         },
  //         'features': [
  //           {
  //             'type': 'LABEL_DETECTION'
  //           },
  //           {
  //             'type': 'WEB_DETECTION'
  //           },
  //           {
  //             'type': 'FACE_DETECTION'
  //           }
  //         ]
  //       }
  //     ]
  //   };
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   console.log(body);
    
  //   this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body, httpOptions)
  //     .subscribe((data) => {
  //       console.log(data);
  //     }, (err) => {
  //       console.log(err);

  //     });
  // }
  uploadFile(fileBlob) {
    let filePath: string;
    filePath = new Date().toUTCString();
    const file = fileBlob;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    const progress = task.percentageChanges();
    progress.subscribe((data) => {
      console.log(data);
    });
  }

  getBlob(b64Data: string, contentType: string, sliceSize: number = 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
