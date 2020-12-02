export interface ICityList {
  id: number;
  name: string;
}

export class ICity {
  readonly id: number;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

export class ICityWeather {
  readonly type: string;
  readonly type_description: string;
  readonly sunrise: string;
  readonly sunset: string;
  readonly temp: number;
  readonly temp_min: number;
  readonly temp_max: number;
  readonly pressure: number;
  readonly humidity: number;
  readonly clouds_percent: number;
  readonly wind_speed: number;
}
