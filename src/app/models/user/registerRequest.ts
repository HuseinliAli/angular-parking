import { Gender } from './gender';

export interface RegisterRequestModel {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Password: string;
  Gender: Gender;
}
