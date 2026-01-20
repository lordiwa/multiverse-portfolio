<template>
  <component
    :is="currentLayout"
    :profile="profile"
    :theme="theme"
    @open-email="$emit('open-email')"
    @open-madlibs="$emit('open-madlibs')"
    @open-tetris="$emit('open-tetris')"
    @open-coming-soon="$emit('open-coming-soon', $event)"
  />
</template>

<script setup>
import { computed } from 'vue'
import { getThemeGroup } from '../data/themes.js'
import TechLayout from './TechLayout.vue'
import ArtistLayout from './ArtistLayout.vue'
import ExplorerLayout from './ExplorerLayout.vue'
import PerformerLayout from './PerformerLayout.vue'
import GamerLayout from './GamerLayout.vue'
import FantasyLayout from './FantasyLayout.vue'

const props = defineProps({
  profile: { type: Object, required: true },
  theme: { type: Object, required: true },
  career: { type: String, required: true }
})

defineEmits(['open-email', 'open-madlibs', 'open-tetris', 'open-coming-soon'])

const layoutMap = {
  tech: TechLayout,
  artist: ArtistLayout,
  explorer: ExplorerLayout,
  performer: PerformerLayout,
  gamer: GamerLayout,
  fantasy: FantasyLayout
}

const currentLayout = computed(() => {
  const themeGroup = getThemeGroup(props.career)
  return layoutMap[themeGroup] || TechLayout
})
</script>