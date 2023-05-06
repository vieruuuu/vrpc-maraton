<template>
  <div>
    <q-btn label="Sign out" @click="signOut" />

    <p>Type: {{ user.details.type }}</p>

    <p>Name: {{ formatUserName(user) }}</p>

    <p>Email: {{ user.email }}</p>

    <template v-if="user.details.type === 'candidate'">
      <p>Badges: {{ user.badges }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatUserName } from "common/lib/users";

const { user, signOut } = useAuthStore();
</script>
