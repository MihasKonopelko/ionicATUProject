import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

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


  constructor() { }

  ngOnInit() {
    this.weatherData = [];
    this.apiKey = "0bc224e47cade816d9380158370217d1";
  }

  ionViewWillEnter() {
    this.weatherData = [];
    this.getWeather();
  }

  async getWeather(){
    /*
    // Wait to get name from DB.
    let cca2ToSearch = await this.dms.get("cca2ToSearch");
    this.country = await this.dms.get("countryToSearch");


    // Create URL.
    let url = "https://newsdata.io/api/1/latest?apikey=" + this.apiKey + 
    "&country=" + cca2ToSearch;

    // Wait to get news for a country from internet.
    let result:any = await this.hms.get({url:url});

    console.log (result.data.status);
    if (result.data.status == "success"){
      this.newsData = result.data.results;
    }
    
    console.log (result);
*/
  console.log ("perkele");
    
  }



}
