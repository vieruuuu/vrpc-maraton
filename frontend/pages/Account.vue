<template>
  <div>
    <q-card>
      <div>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="xl">
              <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body1">
            <q-item-label>{{ formatUserName(user) }}</q-item-label>
            <q-item-label caption>Type:{{ user.details.type }}</q-item-label>
          </q-item-section>
        </q-item>

        <template v-if="user.details.type === 'candidate'">
          <p>Badges: {{ user.badges.length }}</p>
        </template>
        <template v-else>
          <div class="q-ma-lg">
            <div class="text-bold">Description</div>
            <div>
              Our is a young, dedicated promoting company. We work hard to
              promote your brand and reach new customers. Our team is
              knowledgeable about the latest in online marketing, social media,
              and search engine optimization. We have an intense focus on
              driving conversions and increasing sales for our clients.
            </div>
            <div class="q-my-md">
              <div class="text-bold text-body1">Info:</div>
              <div>Email:{{ user.email }}</div>
              <div>Phone: 0774 777 666</div>
              <div>HQ:Romania , Iasi</div>
            </div>
          </div>
        </template>

        <q-btn class="q-ma-md" label="Sign out" @click="signOut" />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { formatUserName } from "common/lib/users";

const { user, signOut } = useAuthStore();
</script>
