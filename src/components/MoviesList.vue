<template>
  <ul class="movies">
    <li class="movie" v-for="{ title, year, poster, id } in movies" :key="id">
      <h3>{{ title }}</h3>
      <p>{{ year }}</p>
      <img :src="poster" :alt="title" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Movie } from '@/types'

interface Props {
  movies: Movie[]
}

const props = defineProps<Props>()
const movies = toRef(props, 'movies')
</script>

<style scoped>
.movies {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.movie {
  text-align: center;
}

.movie h3 {
  padding: 0;
  margin: 0;
}

.movie img {
  border-radius: 8px;
  margin-top: 5px;
}
</style>
