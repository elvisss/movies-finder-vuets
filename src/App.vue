<script setup lang="ts">
import { useMovies } from './composables/useMovies'
import { useSearch } from './composables/useSearch'
import MoviesList from './components/MoviesList.vue'
import { ref } from 'vue'

const sort = ref<boolean>(false)
const { searchTerm, errorMessage, firstRender } = useSearch()
const { movies, isLoading, isError, searchMoviesByText, hasMovies } = useMovies(
  { searchTerm, sort }
)

const onSubmit = () => {
  searchMoviesByText()
}
</script>

<template>
  <main class="page">
    <h1>Movies Finder</h1>

    <form @submit.prevent="onSubmit" class="form">
      <div class="input-form">
        <input
          :class="errorMessage ? 'input-error' : ''"
          v-model="searchTerm"
          type="text"
          placeholder="Avengers, Star Wards, ..."
        />
        <input type="checkbox" v-model="sort" />
        <button type="submit">Search</button>
      </div>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    </form>

    <section class="movies-section">
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
        <template v-else-if="!firstRender">
          <p>Movies not found!</p>
        </template>
      </template>
    </section>
  </main>
</template>

<style scoped>
.movies-section {
  display: flex;
  justify-content: center;
  width: 100%;
}

.input-error {
  border: 1px solid red;
}

.input-form {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.error-message {
  color: red;
}
</style>
