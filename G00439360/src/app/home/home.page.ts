import { Component } from '@angular/core';
import { IonButton, IonIcon, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonIcon, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {

  link!:string;

  constructor() {
    addIcons({ settingsOutline });
  }


  ngOnInit(){
    this.link = "/settings";
  }


 

}
