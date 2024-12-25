import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HttpOptions } from '@capacitor/core';

import { DataManagerService } from '../services/data-manager.service';
import { HttpManagerService } from '../services/http-manager.service';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',
  styleUrls: ['./all-countries.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonCardContent, 
    IonCardTitle, 
    IonCardHeader, 
    IonCard, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    RouterLink]
})
export class AllCountriesPage implements OnInit {
  countryToSearch!:string;
  countryData:any;

  newsLink!:string;
  weatherLink!:string;

  constructor(private dms: DataManagerService, private hms: HttpManagerService) { }


  ngOnInit() {
    this.newsLink = "/news";
    this.weatherLink = "/weather";

    this.countryToSearch = "";
    
  }

  ionViewWillEnter() {
    this.getCountries();
  }


  async getCountryToSearchFromStorageAndFromInternet() {
    
  }

  async getCountries(){
    // Wait to get name from DB.
    this.countryToSearch = await this.dms.get("countryToSearch");

    // Create URL.
    let url = "https://restcountries.com/v3.1/name/" + this.countryToSearch;

    // Wait to get countries from internet.
    let result:any = await this.hms.get({url:url});

    this.countryData = result.data;
  }

  async onPressingButton(countryOfficialName:string, cca2:string, latlng:any){
    await this.dms.set("countryToSearch", countryOfficialName);
    await this.dms.set("cca2ToSearch", cca2);
    await this.dms.set("latlngToSearch", JSON.stringify(latlng));
  }
}
