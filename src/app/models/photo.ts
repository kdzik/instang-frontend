import { User } from './user';
import { Comment } from './comment';
import { Like } from './like';

export class Photo {
    public photoId: number;
    public photoName: string;
    public title: string;
    public description: string;
    public userName: string;
    public user: User;
    public imageName: string;
    public likedByUserList: Like[];
    public likes: Like[];
    public commentList: Comment[];
    public created: Date;
}