<template>
  <ul>
    <li v-for="{ title, year, poster, id } in movies" :key="id">
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

<style scoped></style>
