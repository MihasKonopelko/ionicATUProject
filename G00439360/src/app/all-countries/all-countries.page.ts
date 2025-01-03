import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
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
    FormsModule]
})
export class AllCountriesPage implements OnInit {
  countryToSearch!:string;
  countryData:any;

  newsLink!:string;
  weatherLink!:string;

  urlAddress!:string

  constructor(
    private dms: DataManagerService, 
    private hms: HttpManagerService, 
    private router: Router) { 
  }

  ngOnInit() {
    this.newsLink = "/news";
    this.weatherLink = "/weather";
    this.urlAddress = "https://restcountries.com/v3.1/name/";
    this.countryToSearch = "";
  }

  ionViewWillEnter() {
    this.getCountries();
  }

  async getCountries(){
    // Wait to get name from DB.
    this.countryToSearch = await this.dms.get("countryToSearch");

    // Create URL.
    let url = this.urlAddress + this.countryToSearch;

    // Wait to get countries from internet.
    let result:any = await this.hms.get({url:url});

    // Save locally the country data.
    this.countryData = result.data;
  }

  async onPressingButton(country:any, nextPage:string){
    // Store in DB
    await this.dms.set("countryToSearch", country.name.official);
    await this.dms.set("cca2ToSearch", country.cca2);
    await this.dms.set("latlngToSearch", JSON.stringify(country.latlng));
    await this.dms.set("capitalOfSearchedCountry", country.capital[0]);

    // Once saved, route to the next page.
    this.router.navigate([nextPage]);
  }
}
