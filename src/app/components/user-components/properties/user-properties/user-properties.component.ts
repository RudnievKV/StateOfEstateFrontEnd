import { Component, OnInit, } from '@angular/core';
import Swiper, { Navigation } from 'swiper';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { PropertyService } from 'src/app/services/property.service';
import { PropertyDto } from 'src/app/models/PropertyDtos/PropertyDto';
import { Subscription, firstValueFrom, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { TranslocoService } from '@ngneat/transloco';


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
  center: google.maps.LatLngLiteral = { lat: 42.291277033730374, lng: 18.84845106977263 };
  zoom = 13;

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];


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
  private routeSub!: Subscription;
  constructor(
    private _gallery: Gallery,
    private _propertyService: PropertyService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _translocoService: TranslocoService
  ) {
    this.images = [];
    this.languageChangeSubscription = _translocoService.langChanges$.subscribe(lang => {
      this.trigger = this.trigger + 1;
    });
  }
  languageChangeSubscription!: Subscription;
  trigger = 0;

  property!: PropertyDto;
  similarProperties!: Array<PropertyDto>;
  typeAndId!: string;
  id!: number;
  type = "sale";
  async ngOnInit() {
    this.routeSub = this._activatedRoute.params.subscribe(params => {
      this.typeAndId = params['id'];
      this.id = parseInt(this.typeAndId.substring(1));
    });
    if (this.typeAndId[0] == "r") {
      this.type = "rent";
    }

    let similarPropertiesObservable = this._propertyService.GetSimilarProperties(this.id);
    let propertyObservable = this._propertyService.GetProperty(this.id);

    await firstValueFrom(forkJoin([similarPropertiesObservable, propertyObservable]))
      .catch(error => {
        console.log(error);
        //this._location.back();
        this._router.navigateByUrl('404');
      })
      .then(results => {
        if (results) {
          this.similarProperties = results[0];
          this.property = results[1];
        } else {

        }

      });

    console.log(this.type + " " + this.property.IsForSale);
    console.log(this.property);
    if (this.type == "sale" && this.property.IsForSale == false) {
      //this._router.navigateByUrl("/");
    }
    // Set gallery items  array
    this.property.Photos!.forEach(photo => {
      this.images.push(new ImageItem({ src: photo.PhotoUrl, thumb: photo.PhotoUrl }));
    });

    if (this.property.CoordinateX && this.property.CoordinateY) {
      let coordinates = { lat: this.property.CoordinateX, lng: this.property.CoordinateY };
      this.center = coordinates;
      this.markerPositions.push(coordinates);
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.languageChangeSubscription.unsubscribe();
  }
  onItemClick(event: any) {
    // Open the gallery when an image is clicked
    this._gallery.ref(event.index);
  }
}
