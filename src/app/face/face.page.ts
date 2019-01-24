import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-face',
  templateUrl: 'face.page.html',
  styleUrls: ['face.page.scss']
})
export class FacePage {
  image: any = {
    'src': 'https://www.sanger.ac.uk/sites/default/files/gaffney-group.jpg'
  };
  constructor(private cameraService: CameraService) {
  }
  captureImage() {
    this.cameraService.getPicture();
  }
}
