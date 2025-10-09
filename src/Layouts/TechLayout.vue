<template>
  <div class="tech-layout portfolio-container">
    <!-- Keep current structure - it works for tech -->
    <ContactInfo
        :contact="profile.contact"
        :theme="theme"
        @open-email="$emit('open-email')"
        @open-madlibs="$emit('open-madlibs')"
        @open-tetris="$emit('open-tetris')"
    />
    <ExperienceList
        :experiences="profile.experiences"
        :theme="theme"
    />
    <PersonalLinks
        :links="profile.links"
        :theme="theme"
        @open-tetris="$emit('open-tetris')"
        @open-madlibs="$emit('open-madlibs')"
        @open-coming-soon="$emit('open-coming-soon', $event)"
    />
  </div>
</template>

<script setup>
import ContactInfo from '../components/ContactInfo.vue'
import ExperienceList from '../components/ExperienceList.vue'
import PersonalLinks from '../components/PersonalLinks.vue'

defineProps({
  profile: { type: Object, required: true },
  theme: { type: Object, required: true }
})

defineEmits(['open-email', 'open-madlibs', 'open-tetris', 'open-coming-soon'])
</script>

<style scoped>
.tech-layout {
  /* Uses existing portfolio-container styles */
}
</style>