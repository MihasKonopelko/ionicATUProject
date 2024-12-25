import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';

import { DataManagerService } from '../services/data-manager.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class SettingsPage implements OnInit {
  selectedUnits!:string;

  constructor(private dms: DataManagerService) {
    this.getUnitsFromStorage();
  }

  ngOnInit() {

  }

  async getUnitsFromStorage() {
    this.selectedUnits = await this.dms.get("selectedUnits");
  }

  async saveUnitsToStore(value:string) {
    this.selectedUnits = value;
    await this.dms.set("selectedUnits", this.selectedUnits);
  }
}
