export enum ResponseErrorCode {
	BAD_REQUEST= 'BadRequestError',
	NOT_FOUND = 'NotFoundError',
}
export const ErrorMessages = {
	NOT_FOUND: 'not found',
	LAT_REQUIRED: 'lat required',
	LNG_REQUIRED: 'lng required',
	LNG_LAT_INVALID: 'lng/lat must be valid numbers',
	CITYID_INVALID: 'city_id must be a number string'
}
export const SERVER_CONNECTION_MSG = 'API Gateway is listening at port';
