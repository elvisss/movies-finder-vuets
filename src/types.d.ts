export type MoviesResponse =
  | { Response: 'True', Search: MovieResponse[], totalResults: string }
  | { Response: 'False', Error: string }

export interface MovieResponse {
  Title: string
  Year: string
  imdbID: string
  Type: Type
  Poster: string
}

export interface Movie {
  id: string
  title: string
  year: string
  poster: string
  type: Type
}

export enum Type {
  Movie = 'movie',
  Series = 'series'
}
