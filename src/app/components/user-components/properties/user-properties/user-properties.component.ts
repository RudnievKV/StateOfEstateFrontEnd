import { Component, OnInit, } from '@angular/core';
import Swiper, { Navigation } from 'swiper';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';



Swiper.use([Navigation]);

// delete after back-end integration
const mockImages = [
  'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp',
  'https://gomonte.me/uploads/cache/4b/31/4b31ed1ca972cc3cd21c5aa26b99bcc8.webp',
  'https://gomonte.me/uploads/cache/f1/68/f168aad669d958f3b31002ec32e47c5d.webp',
  'https://gomonte.me/uploads/cache/e1/a7/e1a78f0bed13ad4b377ae13fb559e72c.webp'
];
const mockPropertyCard = {
  title: 'Полтава',
  location: 'Богор, Джава Барат',
  price: '$25,000',
  size: '360m2 Living Area',
  urls: mockImages
}
const mockedProperties = new Array(5).fill(mockPropertyCard);

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss']
})
export class UserPropertiesComponent implements OnInit {
  properties = mockedProperties;
  display: any;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      slidesOffsetBefore: -30,
      slidesOffsetAfter: -30,
      speed: 400,
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        // when window width is <= 767px (mobile)
        80: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        986: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        },

      }
    });



  }
  galleryId = 'myLightbox';
  images: GalleryItem[];
  constructor(private gallery: Gallery) {
    this.images = [];
  }
  ngOnInit() {
    // Set gallery items array
    this.images = [
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp', thumb: 'https://gomonte.me/uploads/cache/7f/35/7f354fc07a694463e30867418f91f394.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp', thumb: 'https://gomonte.me/uploads/cache/a9/51/a951943f0ab6e99f40cc438280e98789.webp' }),
      new ImageItem({ src: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp', thumb: 'https://gomonte.me/uploads/cache/c1/74/c1745b73997ebcb4a993a94859e7c653.webp' }),
      // ... more items
    ];


  }

  onItemClick(event: any) {
    // Open the gallery when an image is clicked
    this.gallery.ref(event.index);
  }







} 
