import { Component, OnInit, ElementRef } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import * as p5 from 'p5';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  photos = this.photoService.photos;
  canvasX=300;
  canvasY=500;
  lineWidth=2;
  strokeColor=0;
  canvasElement: any;
  constructor(private el:ElementRef, private base64ToGallery: Base64ToGallery, 
    public toastController: ToastController,public photoService: PhotoService) {

  }
ngOnInit(){
  this.photoService.loadSaved();
  const p5obj=new p5(p =>{
    p.setup =() =>{ this.setup(p);};
    p.draw =() =>{ this.draw(p);};
  },this.el.nativeElement);
}
 setup(p){
  const c=document.querySelector('#canvasContainer');
  p.createCanvas(p.displayWidth,this.canvasY).parent(c);
  p.background(230);
}
 draw(p){
   p.stroke(this.strokeColor);
   p.strokeWeight(this.lineWidth);
   if(p.mouseIsPressed){
     p.line(p.mouseX,p.mouseY,p.pmouseX,p.pmouseY);
   }
 }

 addPhotoToGallery() {
  this.photoService.addNewToGallery();
  this.presentToast();
}
 exportImage(){

   
  }
   /*

   const c:any=document.querySelector('#canvasContainer canvas');
   let dataUrl=c.toDataURL();
   let link = document.getElementById('downloadLink');
   link.setAttribute('download','image.png');
   link.setAttribute('href', dataUrl.replace("image/png","image/octet-stream"));
   link.click();


const options: Base64ToGalleryOptions = { prefix: 'canvas_', mediaScanner:  true };
    this.base64ToGallery.base64ToGallery(dataUrl, options).then(
      async res => {
        const toast = await this.toastCtrl.create({
          message: 'Image saved to camera roll.',
          duration: 2000
        });
        toast.present();
      },
      err => console.log('Error saving image to gallery ', err)
    );
 */

   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your paintingss have been saved.',
      duration: 2000
    });
    toast.present();
  }


 
}
