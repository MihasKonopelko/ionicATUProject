import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

import { DataManagerService } from '../services/data-manager.service';
import { HttpManagerService } from '../services/http-manager.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  apiKey!:string
  urlAddress!:string;
  urlImageAddress!:string;
  
  capitalName!:string
  temperature!:number
  weatherTitle!:string
  urlToWeatherImage!:string;
  selectedUnits!:string;


  constructor(private dms: DataManagerService, private hms: HttpManagerService) { }

  ngOnInit() {
    this.apiKey = "0bc224e47cade816d9380158370217d1";
    this.urlAddress = "https://api.openweathermap.org/data/2.5/weather?lat=";
    this.urlImageAddress = "https://openweathermap.org/img/wn/";
  }

  ionViewWillEnter() {
    this.getWeather();
  }

  async getWeather(){
    // Get LatLng data for weather.
    let latlngToSearch = JSON.parse(await this.dms.get("latlngToSearch"));

    // Get Units Data
    this.selectedUnits = await this.dms.get("selectedUnits");

    // Get Capital Name
    this.capitalName = await this.dms.get("capitalOfSearchedCountry");

    // Create URL to get weather data.
    let url = 
    this.urlAddress + latlngToSearch[0] + 
    "&lon=" + latlngToSearch[1] + 
    "&units=" + this.selectedUnits + 
    "&appid=" + this.apiKey;
    
    let result:any = await this.hms.get({url:url});
    this.temperature = result.data.main.temp;
    this.weatherTitle = result.data.weather[0].description;

    // Construct URL to an image for weather.
    this.urlToWeatherImage =  this.urlImageAddress + result.data.weather[0].icon + ".png";
  }
}
