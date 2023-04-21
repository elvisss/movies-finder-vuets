import { ref, watch } from 'vue'

export const useSearch = () => {
  const searchTerm = ref<string>('')
  const previousSearch = ref<string>('')
  const firstRender = ref<boolean>(true)
  const errorMessage = ref<string>('')

  watch(
    searchTerm,
    (newSearch, _) => {
      if (firstRender.value) {
        firstRender.value = newSearch === ''
        return
      }

      if (newSearch === '') {
        errorMessage.value = 'Please use a valid word'
        return
      }

      if (newSearch.length < 3) {
        errorMessage.value = 'At least it should has 3 letters'
        return
      }

      errorMessage.value = ''
    },
    { immediate: true }
  )

  return {
    searchTerm,
    previousSearch,
    errorMessage,
    firstRender
  }
}
