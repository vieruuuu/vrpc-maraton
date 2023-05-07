<template>
  <div>
    <div @click="showDialog = true">
      <q-item class="bg-secondary cursor-pointer">
        <q-item-section avatar>
          <user-image size="55px" :user="user" />
        </q-item-section>

        <q-item-section class="text-primary">
          <q-item-label>{{ formatUserName(user) }}</q-item-label>
          <q-item-label caption class="text-bold"> Cowboy </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <user-account-dialog v-model="showDialog" :user-id="user.id" />
  </div>
</template>

<script setup lang="ts">
import { formatUserName } from "common/lib/users";
import type { User } from "types/users";

import UserAccountDialog from "./user-account-dialog.vue";
import UserImage from "./user-image.vue";

const showDialog = ref(false);

const props = defineProps<{
  user: User;
}>();
</script>
