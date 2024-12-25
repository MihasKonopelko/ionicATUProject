import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';

import { DataManagerService } from '../services/data-manager.service';
import { HttpManagerService } from '../services/http-manager.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {
  apiKey!:string;
  newsData:any;
  country!:string;

  constructor(private dms: DataManagerService, private hms: HttpManagerService) { }

  ngOnInit() {
    this.newsData = [];
    this.apiKey = "pub_632977eb474ea6d015a8d26530431158a7318";
  }


  ionViewWillEnter() {
    this.newsData = [];
    this.getNews();
  }


  async getNews(){
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
    

    
  }



}
