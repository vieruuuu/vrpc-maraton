<template>
  <div class="q-mt-xl">
    <q-card>
      <div>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="80px">
              <img
                class="fit"
                :src="
                  'https://xsgames.co/randomusers/assets/avatars/' +
                  (user.registerDate % 2 === 0 ? 'male' : 'female') +
                  '/' +
                  (user.registerDate % 78) +
                  '.jpg'
                "
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">
              {{ formatUserName(user) }}
            </q-item-label>
            <q-item-label caption>
              Member since:{{ formatDate(user.registerDate) }}
            </q-item-label>
            <q-item-label caption>
              Last login:{{ formatDate(user.lastLogin) }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <template v-if="user.details.type === 'candidate'">
          <div class="q-ma-lg">
            <div class="text-bold">Personal description</div>
            <div>
              Worked on 2 projects for the company: CMS and a broker website.
              Learned to work with Ubuntu, Bash, Github. Implemented new
              features and helped solve problems. Collaborated with a small team
              to find solutions that will benefit the projects.
            </div>
            <div class="q-my-md">
              <div class="text-bold text-body1">Info:</div>
              <div>Email:{{ user.email }}</div>
              <div>Phone: 0774 457 666</div>
              <div>Address:Romania , Iasi</div>
            </div>
          </div>
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

        <q-btn
          color="secondary"
          class="q-ma-md text-black"
          label="Sign out"
          @click="signOut"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { formatUserName } from "common/lib/users";
import { formatDate } from "common/lib/date";

const { user, signOut } = useAuthStore();
</script>
