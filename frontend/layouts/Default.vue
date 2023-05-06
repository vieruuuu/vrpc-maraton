<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="cursor-pointer" @click="router.push('/home')">
          NuStiu
        </q-toolbar-title>

        <q-btn
          label="Account"
          to="/account"
          color="secondary"
          class="text-black"
        />
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
            <div class="row flex-center q-pa-sm">
              <div class="col-xs-12 col-sm col-md-9 col-lg-8 col-xl-7">
                <component :is="Component" />
              </div>
            </div>
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
