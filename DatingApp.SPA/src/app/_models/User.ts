import { Photos } from './Photos.ts';


export interface User {
  id: number;
  password: string;
  userName: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos: Photos[];
  lastActivate: Date;
}
