export interface IWeatherAPI {
  readonly coord: ICoord;
  readonly name: string;
  readonly id: number;
  readonly sys: IWeatherSys;
  readonly main: IWeatherMain;
  readonly clouds: IWeatherClouds;
  readonly weather: IWeather[];
  readonly wind: IWeatherWind;
  readonly base: string;
  readonly visibility: number;
  readonly dt: number;
  readonly timezone: number;
  readonly cod: number;
}

export interface ICityListAttributes {
  readonly coord: ICoord;
  readonly name: string;
  readonly id: number;
  readonly dt: number;
  readonly rain: any;
  readonly snow: any;
  readonly sys: ICityListSys;
  readonly main: IWeatherMain;
  readonly clouds: IWeatherClouds;
  readonly weather: IWeather[];
  readonly wind: IWeatherWind;
}

export interface ICityListAPI {
  readonly list: Array<ICityListAttributes>;
}

class ICoord {
  readonly lon: number;
  readonly lat: number;
}

class IWeatherSys {
  readonly type: number;
  readonly id : number;
  readonly country: string;
  readonly sunrise: number;
  readonly sunset: number;
}
class ICityListSys {
  readonly country: string;
}
class IWeatherClouds {
  readonly all: number;
}
class IWeatherWind {
  readonly speed: number;
  readonly deg: number;
}
class IWeather {
  readonly id: number;
  readonly main: string;
  readonly description: string;
  readonly icon: string;
  
}

class IWeatherMain {
  readonly temp: number;
  readonly feels_like: number;
  readonly temp_min: number;
  readonly temp_max: number;
  readonly pressure: number;
  readonly humidity: number;
}
