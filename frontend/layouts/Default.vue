<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="cursor-pointer" @click="router.push('/home')">
          vrpc-maraton
        </q-toolbar-title>

        <q-btn label="Account" to="/account" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <transition
            appear
            mode="out-in"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="100"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
