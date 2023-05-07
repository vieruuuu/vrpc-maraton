<template>
  <q-avatar :size="size ?? '80px'">
    <img
      class="fit"
      :src="
        'https://xsgames.co/randomusers/assets/avatars/' +
        (user.registerDate % 2 === 0 ? 'male' : 'pixel') +
        '/' +
        (user.registerDate % 58) +
        '.jpg'
      "
    />
  </q-avatar>
</template>

<script setup lang="ts">
import type { User } from "types/users";

defineProps<{
  user: User;
  size?: string;
}>();
</script>
