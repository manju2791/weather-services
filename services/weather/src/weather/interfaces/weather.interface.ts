export interface ICityList {
  readonly id: number;
  readonly name: string;
}

export interface ICity {
  readonly id: number;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

export interface ICityWeather {
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
