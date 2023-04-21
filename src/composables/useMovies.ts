import { getMovies } from '@/services/movies'
import type { Movie } from '@/types'
import { computed, ref, watch, type Ref } from 'vue'

interface Props {
  searchTerm: Ref<string>
  sort: Ref<boolean>
}

export const useMovies = ({ searchTerm, sort }: Props) => {
  const movies = ref<Movie[]>([])
  const sortedMovies = ref<Movie[]>([])
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const previousSearch = ref<string>('')

  const hasMovies = computed<boolean>(() => {
    return movies.value.length > 0
  })

  const searchMoviesByText = async () => {
    if (searchTerm.value === previousSearch.value) return

    try {
      isLoading.value = true
      isError.value = false
      movies.value = []
      previousSearch.value = searchTerm.value
      const response = await getMovies(searchTerm.value)
      movies.value = response
      sortedMovies.value = response
    } catch (err) {
      console.log(err)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  watch(sort, (newValue, _oldValue) => {
    const newMovies = newValue ? [...movies.value].sort((a, b) => a.title.localeCompare(b.title)) : movies.value
    sortedMovies.value = newMovies
  })

  return {
    isLoading,
    isError,
    movies: sortedMovies,
    hasMovies,
    searchMoviesByText
  }
}
