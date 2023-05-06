<template>
  <home-candidate v-if="user.details.type === 'candidate'" />
  <home-company v-else />
</template>

<script setup lang="ts">
import HomeCandidate from "./HomeCandidate.vue";
import HomeCompany from "./HomeCompany.vue";

const { user } = useAuthStore();
</script>
