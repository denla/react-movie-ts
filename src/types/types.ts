// export interface Film {
//   kinopoiskId: number;
//   posterUrl: string;
//   nameRu: string;
//   year: string;
//   ratingKinopoisk?: number;
// }

export interface Film {
  posterUrl: string;
  nameRu: string;
  year: number;
  ratingKinopoisk: number;
  genres: Genre[];
  description: string;
  kinopoiskId: number;
}

export interface Genre {
  genre: string;
}
