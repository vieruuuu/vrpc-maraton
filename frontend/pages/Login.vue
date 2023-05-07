<template>
  <div>
    <div v-if="titlePage">
      <div>
        <div
          class="text-h1 text-amber-5 row justify-center"
          style="min-width: max-content"
        >
          <q-icon :name="'img:' + getAsset('logo.png')" size="80px" />
          Bounty<span class="text-white">Trail</span>
        </div>

        <div class="row justify-center q-mt-md q-mb-xl">
          <q-btn
            class="text-black"
            label="Play"
            color="amber-5"
            size="lg"
            @click="titlePage = false"
          />
        </div>
      </div>

      <div class="q-my-xl text-white text-justify">
        <div class="text-body1 text-bold text-center q-mb-sm">
          What is BountyTrail?
        </div>
        <div class="text-body2 q-mb-xs">
          💼 A new and exciting way of connecting employers and employees..
        </div>
        <div class="text-body2 q-mb-xs">
          ⭐ As a employer you will "play" as a Sheriff who is posting
          bounties(jobs opportunities) and paying rewards(starting bonus)
        </div>
        <div class="text-body2 q-mb-xs">
          🤠 As a employee you will "play" as a Cowboy always looking for his
          new bounty to collect and for his rewards to cash out
        </div>
        <div class="text-h6 q-mb-xs text-center">
          So are you ready to conquer the Wild West?
        </div>
      </div>
    </div>

    <q-form v-else @submit="login">
      <q-card bordered flat>
        <q-card-section>
          <div class="col-12 text-h6 text-center">Login</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <email-input v-model="email" />
            </div>

            <div class="col-12">
              <password-input v-model="password" />
            </div>
            <router-link
              class="col-12 text-secondary text-bold text-body2"
              to="/register"
            >
              Don't have an account?
            </router-link>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            no-caps
            size="lg"
            label="Login"
            color="primary"
            outline
            type="submit"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth } from "@/lib/firebase";
import EmailInput from "@@/email-input.vue";
import PasswordInput from "@@/password-input.vue";

const titlePage = ref(true);

const email = ref("");
const password = ref("");

const loading = ref(false);

async function login() {
  loading.value = true;

  try {
    const { user } = await signInWithEmailAndPassword(
      firebaseAuth,
      email.value,
      password.value
    );

    if (!user.email) {
      return;
    }
  } catch (_) {
    password.value = "";

    somethingsWrong("Invalid credentials");
  }

  loading.value = false;
}
</script>
