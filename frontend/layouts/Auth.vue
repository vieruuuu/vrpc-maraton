<template>
  <div>
    <div>
      <div
        class="bg-primary"
        style="
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
        "
      />
    </div>

    <div
      class="row items-center justify-center"
      :style="{
        'margin-top': '30vh',
      }"
    >
      <div class="q-pa-md col-xs-12 col-lg-3">
        <loading-login v-if="userSaved" />

        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingLogin from "@/pages/LoadingLogin.vue";

const { userSaved } = useAuthStore();
const { screen } = useQuasar();
</script>
