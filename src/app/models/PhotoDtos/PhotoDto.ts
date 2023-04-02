export class PhotoDto {
  Photo_ID!: number;
  PhotoUrl!: string;
  Position!: number;
  PhotoName!: string;
  constructor(Photo_ID: number, PhotoUrl: string, Position: number, PhotoName: string) {
    this.Photo_ID = Photo_ID;
    this.PhotoUrl = PhotoUrl;
    this.Position = Position;
    this.PhotoName = PhotoName;
  }
}

