import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {
  visionData: any = {};
  constructor(private cameraService: CameraService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    const image = document.getElementById('sourceImage');
    image.setAttribute('src', 'data:image/jpeg;base64,' + localStorage.getItem('imageData'));
    this.visionData = this.cameraService.visionData;
  }
  captureImage() {
    const options = {};
    this.cameraService.getPicture(options);
  }
  browseImage() {
    const options = {
      'isBrowsed': true
    };
    this.cameraService.getPicture(options);
  }
}
