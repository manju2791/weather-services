import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, Method } from 'axios';
import { IAxiosRequest } from '../interfaces/axios-request.interface';

@Injectable()
export class WeatherHttpClient {
  public makeRequest({ method, baseURL, path, payload, headers, params }: IAxiosRequest): Promise<any> {
    const configs = {
      method: method as Method,
      url: `${baseURL}/${path}`,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      params,
    };
    const options = !!payload ? configs : { ...configs, data: payload };
    return axios(options).then((response: AxiosResponse) => response.data);
  }
}
