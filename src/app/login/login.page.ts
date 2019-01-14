import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { trigger, style, animate, transition, state, query, stagger } from '@angular/animations';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('slideInUpWithDelay', [
      state('in', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate3d(0, 2000px, 0)'
        }),
        animate('0.5s')
      ])
    ])
  ],
})
export class LoginPage implements OnInit {
  isOpen = true;
  slideOpts = {
    effect: 'flip',
  };
  slides: any;
  Item = new User;
  private userDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  currentUser: Observable<any>;
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private modalCtrl: ModalController, private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.signupForm = new FormGroup({
      mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      name: new FormControl(''),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
    this.loginForm = new FormGroup({
      mobile: new FormControl(''),
      password: new FormControl('')
    });
  }

  doLogin() {
    this.currentUser = this.afs.doc('users/' + this.loginForm.value.mobile).valueChanges();
    this.currentUser.subscribe((data: any) => {
      if (data) {
        if (data.password === this.loginForm.value.password) {
          alert('Success');
        } else {
          alert('Bad Credentials');
        }
      } else {
        alert('Bad Credentials');
        return;
      }
    });
  }

  doSignup() {
    this.userDoc = this.afs.doc<User>('users/' + this.signupForm.value.mobile);
    this.currentUser = this.afs.doc('users/' + this.signupForm.value.mobile).valueChanges();
    this.currentUser.subscribe((data: any) => {
      if (data) {
        return;
      } else {
        this.userDoc.set(this.signupForm.value);
      }
    });
  }


  toggleLogin() {
    this.isOpen = false;
    setTimeout(() => {
      this.slideTo(0);
    }, 50);
  }

  toggleCreate() {
    this.isOpen = false;
    setTimeout(() => {
      this.slideTo(1);
    }, 50);
  }

  slideTo(slide: number) {
    this.slides = document.getElementById('slides');
    this.slides.slideTo(slide);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}