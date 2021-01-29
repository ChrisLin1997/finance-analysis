import { ref, computed } from 'vue'

export function useLoading () {
  const state = ref(0)

  return {
    isLoading: computed(() => state.value !== 0),
    load: () => ++state.value,
    unload: () => --state.value,
  }
}
