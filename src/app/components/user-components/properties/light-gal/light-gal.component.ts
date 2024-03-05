import { Component, OnInit } from '@angular/core';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
} from 'ng-gallery';

@Component({
  selector: 'app-light-gal',
  templateUrl: './light-gal.component.html',
  styleUrls: ['./light-gal.component.scss'],
})
export class LightGalComponent implements OnInit {
  items: GalleryItem[] = [];
  remainingImages: number;

  constructor(public gallery: Gallery) {
    this.remainingImages = this.items.length - 1;
  }
  ngOnInit() {
    // 1. Create gallery items
    //

    //

    this.items = data.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );
    //

    // Load items into the lightbox
    this.basicLightboxExample();

    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig();
  }
  basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }

  /**
   * Use custom gallery config with the lightbox
   */
  withCustomGalleryConfig() {
    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }
}
const data = [
  {
    srcUrl:
      'https://gomonte.me/uploads/cache/1d/86/1d867b03e162feaec1dd104f369fffc5.webp',
    previewUrl:
      'https://gomonte.me/uploads/cache/1d/86/1d867b03e162feaec1dd104f369fffc5.webp',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa00WAI08ht-DIP-5MRiVUKrbKLdR5GEJng&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa00WAI08ht-DIP-5MRiVUKrbKLdR5GEJng&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotqS-f5dbKVwnZkAn7pbrMUm7ECd65Mb2Bg&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotqS-f5dbKVwnZkAn7pbrMUm7ECd65Mb2Bg&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa00WAI08ht-DIP-5MRiVUKrbKLdR5GEJng&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa00WAI08ht-DIP-5MRiVUKrbKLdR5GEJng&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotqS-f5dbKVwnZkAn7pbrMUm7ECd65Mb2Bg&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotqS-f5dbKVwnZkAn7pbrMUm7ECd65Mb2Bg&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-K_I60G6L9qNRRvU-SsHHRsjg_UeqUnLw&usqp=CAU',
  },
  {
    srcUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
    previewUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvC_2Y9v7oy50RWdc0qawlnCR_egN8Kj7jQ&usqp=CAU',
  },
];
