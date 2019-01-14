import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http';

@Injectable({
  providedIn: 'root'
})
export class VisionService {

  constructor(private http: HTTP) { }

  getData(base64Image) {
    const body = {
      'requests': [
        {
          'image': {
            'content': base64Image
          },
          'features': [
            {
              'type': 'LABEL_DETECTION'
            },
            {
              'type': 'WEB_DETECTION'
            },
            {
              'type': 'FACE_DETECTION'
            }
          ]
        }
      ]
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body, httpOptions);
  }
}
