import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {

  imageName: string;

  constructor(private _imageService: ImageService) {
    this.imageName = '';
   }

  ngOnInit(): void {
  }

  searchImages(){
    if(this.imageName === ''){
      this._imageService.setError('Add a search term');
      return;
    }

    this._imageService.sendSearchTerm(this.imageName);
  }

}
