import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { DataManagerService } from '../services/data-manager.service';
import { HttpManagerService } from '../services/http-manager.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  weatherData:any;
  apiKey!:string


  constructor(private dms: DataManagerService, private hms: HttpManagerService) { }

  ngOnInit() {
    this.weatherData = [];
    this.apiKey = "0bc224e47cade816d9380158370217d1";
  }

  ionViewWillEnter() {
    this.weatherData = [];
    this.getWeather();
  }

  async getWeather(){
    // Get LatLng data for weather.
    let latlngToSearch = JSON.parse(await this.dms.get("latlngToSearch"));
    console.log (latlngToSearch);

    // Get Units Data
    let selectedUnits = await this.dms.get("selectedUnits");


    // Create URL.
    let url = 
    "https://api.openweathermap.org/data/2.5/weather?lat=" + latlngToSearch[0] + 
    "&lon=" + latlngToSearch[1] + 
    "&units=" + selectedUnits + 
    "&appid=" + this.apiKey;
    
    let result:any = await this.hms.get({url:url});
    
    console.log (result.data);

   

    
  }



}
