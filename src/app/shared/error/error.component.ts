import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  text = '';
  show = false;
  subscription: Subscription;

  constructor(private _imageService: ImageService) {
    this.subscription = this._imageService.getError().subscribe(data =>{
      this.showMessage();
      this.text = data;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showMessage(){
    this.show = true;
    setTimeout(() => {
      this.show = false;
    },2500)
  }

}
