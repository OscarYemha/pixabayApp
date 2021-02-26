import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {

  term = '';
  subscription: Subscription;
  listImages: any[] = [];
  loading = false;
  imagesPerPage = 30;
  currentPage = 1;
  calculateTotalPages = 0;

  constructor(private _imageService: ImageService) {
    this.subscription = this._imageService.getSearchTerm().subscribe(data =>{
      this.term = data;
      this.currentPage = 1;
      this.loading = true;
      this.getImages();
    })
   }

  ngOnInit(): void {
  }

  getImages(){
    this._imageService.getImages(this.term, this.imagesPerPage, this.currentPage).subscribe(data => {
      this.loading = false;
      if(data.hits.length === 0){
        this._imageService.setError("Opss... We didn't find any result");
        return;
      }
      this.calculateTotalPages = Math.ceil(data.totalHits/this.imagesPerPage);

      this.listImages = data.hits;
    }, error =>{
      this._imageService.setError('Opss... An error occurred.');
      this.loading = false;
    });
  }

  previousPage(){
    this.currentPage--;
    this.loading = true;
    this.listImages = [];
    this.getImages();
  }

  nextPage(){
    this.currentPage++;
    this.loading = true;
    this.listImages = [];
    this.getImages();
  }

  previousPageClass(){
    if(this.currentPage === 1) return false;
    return true;
  }

  nextPageClass(){
    if(this.currentPage === this.calculateTotalPages) return false;
    return true;
  }

}
