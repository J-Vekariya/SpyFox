import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { CameraService } from '../services/camera.service';



@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: any = [];
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public userService: UserService,
    private cameraService: CameraService) { }

  ngOnInit() {
    this.history = this.userService.loggedInUser.history;
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  deleteHistoryItem(index: any) {
    this.userService.loggedInUser.history.splice(index, 1);
    this.cameraService.updateHistory();
    localStorage.setItem('loggedInUser', JSON.stringify(this.userService.loggedInUser));
  }
}
