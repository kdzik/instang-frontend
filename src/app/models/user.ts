import {Photo} from './photo';
import { Follow } from './follow';

export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public created: Date;
    public photoList: Photo[];
    public likedPhotoList: Photo[];
    public followers: Follow[];
    public followed: Follow[];
}