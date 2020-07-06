import { Component } from '@angular/core';
import { PiholeService } from '../pihole-service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    activityData: any;
    loginStatus: boolean = false;

    constructor(
        private piHole: PiholeService,
        private toast: ToastController
    ) {}
        
        async presentToast(message) {
            const toast = await this.toast.create({
                message: message,
                duration: 3000,
                position: "middle"
              });
              toast.present();
        }
        
        ionViewWillEnter() {
            //
            this.piHole.getActivity().subscribe( response => {
                var responseData = response;
                this.activityData = responseData['data'];
                this.loginStatus = true; // Login set as true to remove message
            }, error => {
                this.presentToast("Could not get data, have you added the PWHASH?")
            })
        }
    }
    
    