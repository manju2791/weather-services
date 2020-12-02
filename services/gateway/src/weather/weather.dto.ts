import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CityFinderDTO {
  @IsNotEmpty({ message: 'lat required' })
  lat: number;
  @IsNotEmpty({ message: 'lng required' })
  lng: number;
}

export class CityIdDTO {
  @IsNumberString()
  city_id: number;
}
