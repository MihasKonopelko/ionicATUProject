import { Component } from '@angular/core';
import { IonButton, IonIcon, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, 
    IonButton, 
    IonIcon, 
    IonInput, 
    IonItem, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    FormsModule,
    RouterLink],
})

export class HomePage {
  settingsLink!:string;
  countriesLink!:string;
  countryToSearch!:string;

  constructor(private dms: DataManagerService) {
    addIcons({ settingsOutline });
  }

  ngOnInit() {
    this.settingsLink = "/settings";
    this.countriesLink = "/all-countries"
    this.checkIfUnitsAreSelected();
  }


  // Checks if measurement units are present in DB.  If not, set them as "metric".
  async checkIfUnitsAreSelected(){
    let selectedUnits = await this.dms.get("selectedUnits");
    if (selectedUnits == null){
      await this.dms.set("selectedUnits", "metric");
    }
  }




  async setCountryToSearch() {
    await this.dms.set("countryToSearch", this.countryToSearch);
  }
}
