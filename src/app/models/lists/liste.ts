import { MovieResponse } from 'src/app/models/tmdb-data/Movie';

export class Liste {
    uid: string;
    name: string;
    films: Array<MovieResponse>;
    partage?: boolean;
    listeIdPartage: string[];
}
