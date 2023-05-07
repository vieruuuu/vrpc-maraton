<template>
  <div class="q-mt-xl">
    <user-account :user="user">
      <q-btn
        color="secondary"
        class="q-ma-md text-black"
        label="Sign out"
        @click="signOut"
      />
    </user-account>
  </div>
</template>

<script setup lang="ts">
import UserAccount from "@@/user-account.vue";

const { user, signOut } = useAuthStore();
</script>
