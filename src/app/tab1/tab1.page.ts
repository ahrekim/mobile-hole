import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PiholeService } from '../pihole-service';
import { GeneralData } from '../models/general-data';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  generalData: any
  isChecked: boolean = false;
  holeStatus: any
  loginStatus: boolean = false;

  constructor(
    private piHole: PiholeService,
    private toast: ToastController
  ) {}

  async presentToast(message: string){
    const toast = await this.toast.create({
        message: message,
        duration: 3000,
        position: "middle"
      });
      toast.present();
  }

  ionViewWillEnter(){
      this.piHole.getData().subscribe(
        data => {
          this.generalData = data;
        }
      );
    this.getStatus();
  }

  getStatus() {
    this.piHole.getStatus().subscribe( response => {
        this.holeStatus = response;
        this.loginStatus = true;
        console.log('Status: ' + this.holeStatus.status);
        if(this.holeStatus.status == "enabled"){
          this.isChecked = true
        } else {
          this.isChecked = false;
        }
    })
  }

  updateStatus(){
    //Post the new value tot he backend
    this.piHole.updateStatus(!this.isChecked).subscribe(
      response => {
        console.log('success!');
        this.getStatus();
      }, err => {
        // Toggle back and give error
        //this.isChecked = !this.isChecked;
        console.log('error');
      }
    )
  }

}
