import { IsNotEmpty } from 'class-validator';
import { ERR_MSG } from '../../const/constant';

export class CitiesFinderDTO {
  @IsNotEmpty({ message: ERR_MSG.LAT_REQUIRED })
  lat: number;
  @IsNotEmpty({ message: ERR_MSG.LNG_REQUIRED })
  lng: number;
}
