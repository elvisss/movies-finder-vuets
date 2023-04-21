import { getMovies } from '@/services/movies'
import type { Movie } from '@/types'
import { computed, ref } from 'vue'

export const useMovies = () => {
  const movies = ref<Movie[]>([])
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  const hasMovies = computed<boolean>(() => {
    return movies.value.length > 0
  })

  const searchMoviesByText = async (filterText: string) => {
    try {
      const response = await getMovies(filterText)
      movies.value = response
    } catch (err) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    movies,
    hasMovies,
    searchMoviesByText
  }
}
