import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ErrorMessages } from '../constant/constant';

export class CityFinderDTO {
  @IsNotEmpty({ message: ErrorMessages.LAT_REQUIRED })
  lat: number;
  @IsNotEmpty({ message: ErrorMessages.LNG_REQUIRED })
  lng: number;
}

export class CityIdDTO {
  @IsNumberString()
  city_id: number;
}
