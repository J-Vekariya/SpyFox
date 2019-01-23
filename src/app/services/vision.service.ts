import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class VisionService {

  constructor(private http: HTTP) { }

  getData(base64Image) {
    const body: any =
    {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri":
                "https://discourse-cdn-sjc1.com/ionicframework/uploads/default/original/3X/2/e/2efc2e45e734aa66d22139501d253e44931d0a54.png"
            }
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]

      // "requests": [
      //   {
      //     "image": {
      //       "content": base64Image
      //     },
      //     "features": [
      //       {
      //         "type": "LABEL_DETECTION"
      //       },
      //       {
      //         "type": "WEB_DETECTION"
      //       },
      //       {
      //         "type": "FACE_DETECTION"
      //       }
      //     ]
      //   }
      // ]
    };
    // const httpOptions = {
    // 'headers' = {
    //   'Content-Type': 'application/json',
    // })
    // };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body,
      {
        'Content-Type': 'application/json',
      });
  }
}
