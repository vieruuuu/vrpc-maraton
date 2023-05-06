<template>
  <div class="row items-center justify-center bg-primary fullscreen">
    <div class="col-xs-12 col-lg-4">
      <div class="row flex-center text-center q-py-md">
        <div class="row flex-center no-pointer-events non-selectable">vrpc</div>
      </div>
    </div>

    <div class="q-pa-md col-xs-12 col-lg-3">
      <loading-login v-if="userSaved" />

      <router-view v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingLogin from "@/pages/LoadingLogin.vue";

const { userSaved } = useAuthStore();
</script>
