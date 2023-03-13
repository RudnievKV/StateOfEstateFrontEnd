import { Component } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss']
})
export class UserPropertiesComponent {

  images!: GalleryItem[];

  ngOnInit() {
    // Set gallery items array
    this.images = [
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),
      new ImageItem({ src: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg', thumb: 'https://look.com.ua/pic/201210/1280x720/look.com.ua-52342.jpg' }),

      // ... more items
    ];
  }
}
