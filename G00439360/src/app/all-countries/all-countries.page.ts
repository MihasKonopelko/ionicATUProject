import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',
  styleUrls: ['./all-countries.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AllCountriesPage implements OnInit {
  countryToSearch!:string;

  constructor(private dms: DataManagerService) { }

  ngOnInit() {
    this.getCountryToSearchFromStorage();
  }

  ionViewWillEnter() {
    
  }

  async getCountryToSearchFromStorage() {
    this.countryToSearch = await this.dms.get("countryToSearch");
  }


}
