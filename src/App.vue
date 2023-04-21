<script setup lang="ts">
import { ref } from 'vue'
import { useMovies } from './composables/useMovies'
import MoviesList from './components/MoviesList.vue'

const searchTerm = ref<string>('')

const { movies, isLoading, isError, searchMoviesByText, hasMovies } = useMovies()

const onSubmit = () => {
  searchMoviesByText(searchTerm.value)
}
</script>

<template>
  <main class="page">
    <h1>Movies Finder</h1>

    <form @submit.prevent="onSubmit" class="form">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Avengers, Star Wards, ..."
      />
      <button type="submit">Search</button>
    </form>

    <section class="movies">
      <template v-if="isLoading">
        <p>Loading...</p>
      </template>

      <template v-else-if="isError">
        <p>An error ocurred, please try again later</p>
      </template>

      <template v-else>
        <template v-if="hasMovies">
          <MoviesList :movies="movies" />
        </template>
        <template v-else>
          <p>Movies not found!</p>
        </template>
      </template>
    </section>
  </main>
</template>

<style scoped>
.movies {
  display: flex;
  justify-content: center;
}
</style>
