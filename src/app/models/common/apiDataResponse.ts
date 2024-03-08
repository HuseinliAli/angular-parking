import { ApiResponseModel } from './apiResponse';

export interface ApiDataResponseModel<T> extends ApiResponseModel {
  Data: T;
}
