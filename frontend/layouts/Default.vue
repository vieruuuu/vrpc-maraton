<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="cursor-pointer" @click="router.push('/home')">
          <div>
            <div class="text-body1 text-bold text-amber-5 row">
              <q-icon :name="'img:' + getAsset('logo.png')" size="20px" />
              <div>Bounty<span class="text-white">Trail</span></div>
            </div>
          </div>
        </q-toolbar-title>

        <div v-if="user.details.type === 'candidate'" class="q-mr-md">
          <q-btn
            no-caps
            icon="sports_esports"
            label="Games"
            to="/games"
            color="secondary"
            class="text-black"
          />
        </div>

        <div>
          <q-btn
            no-caps
            icon="person"
            label="Account"
            to="/account"
            color="secondary"
            class="text-black"
          />
        </div>
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
const { user } = useAuthStore();
</script>
