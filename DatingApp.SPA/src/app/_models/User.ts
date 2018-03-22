import { Photos } from './Photos.ts';


export interface User {
       id: number;
       username: string;
       knowAs: string;
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
}
