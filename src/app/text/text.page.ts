import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    const image = document.getElementById('sourceImage');
    image.setAttribute('src', 'data:image/jpeg;base64,' + localStorage.getItem('imageData'));
  }
}
