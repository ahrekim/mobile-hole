import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PiholeService } from '../pihole-service';
import { Credentials } from '../models/credentials';
import { ToastController } from '@ionic/angular';



@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    
    credentials: Credentials = new Credentials;

    constructor(
        private piHole: PiholeService,
        private toast: ToastController
        ) {
        }

        async presentToast(message: string){
            const toast = await this.toast.create({
                message: message,
                duration: 3000,
                position: "middle"
              });
              toast.present();
        }
        
        ionViewWillEnter() {
            this.credentials = this.piHole.storedCredentials();
            console.log(this.credentials);
            
        }
        
        ngAfterViewInit() {
            this.credentials = this.piHole.storedCredentials();

        }

        storeCredentials() {
            var storeCreds = this.piHole.storeCredentials(this.credentials);
            this.presentToast(storeCreds);
        }
    }
    