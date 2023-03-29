import { Component } from '@angular/core';
import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss']
})
export class UserPropertiesComponent {
  display: any;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
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
}
