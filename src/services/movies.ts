import type { Movie, MovieResponse, MoviesResponse } from '@/types'

const API_KEY = 'bf9fd5b7'
const baseURL = 'https://www.omdbapi.com'

export const getMovies = async (filterText: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${baseURL}/?apiKey=${API_KEY}&s=${filterText}`)
    const data = (await response.json()) as MoviesResponse
    if (data.Response === 'True') {
      return mappedMovies(data.Search)
    } else {
      return []
    }
  } catch (e) {
    throw new Error('Error searching movies')
  }
}

const mappedMovies = (movies: MovieResponse[]): Movie[] => {
  return movies.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      type: movie.Type,
      year: movie.Year
    }
  })
}
