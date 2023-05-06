<template>
  <q-form @submit="register">
    <q-card bordered flat>
      <q-card-section>
        <div class="col-12 text-h6 text-center">Register</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input
              v-model="userRegister.firstName"
              outlined
              hide-bottom-space
              label="First Name"
              :rules="[
                (val) => UserRegister.shape.firstName.safeParse(val).success,
              ]"
            />
          </div>

          <div class="col-6">
            <q-input
              v-model="userRegister.lastName"
              outlined
              hide-bottom-space
              label="Last Name"
              :rules="[
                (val) => UserRegister.shape.lastName.safeParse(val).success,
              ]"
            />
          </div>

          <div class="col-12">
            <q-btn-toggle
              v-model="userRegister.type"
              class="fit"
              unelevated
              toggle-color="primary"
              spread
              text-color="secondary"
              no-caps
              :options="[
                { label: 'Candidate', value: 'candidate' },
                { label: 'Company', value: 'company' },
              ]"
            />
          </div>

          <div class="col-12">
            <email-input v-model="userRegister.email" />
          </div>

          <div class="col-12">
            <password-input v-model="password" />
          </div>

          <div class="col-12">
            <password-input
              v-model="passwordConfirm"
              confirm-type
              :check-with="password"
            />
          </div>
          <router-link
            class="text-bold text-body2 text-secondary col-12"
            to="/login"
          >
            Already have an account?
          </router-link>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          no-caps
          size="lg"
          label="Register"
          color="primary"
          outline
          type="submit"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { UserRegister } from "types/users";

import { firebaseAuth } from "@/lib/firebase";
import { createUser } from "@/lib/functions";
import EmailInput from "@@/email-input.vue";
import PasswordInput from "@@/password-input.vue";

const password = ref("");
const passwordConfirm = ref("");

const initialUserData = (): UserRegister => ({
  id: "",
  email: "",
  type: "candidate",
  firstName: "",
  lastName: "",
});

const userRegister = ref(initialUserData());

const { setUser } = useAuthStore();

const loading = ref(false);

async function register() {
  loading.value = true;

  try {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      userRegister.value.email,
      password.value
    );

    if (!user.email) {
      signOut(firebaseAuth);
      setUser();

      throw `No email for user ${user.uid}`;
    }
    const finalUserData: UserRegister = { ...userRegister.value, id: user.uid };

    const { data: userResponse } = await createUser(finalUserData);

    setUser(userResponse);
  } catch (_) {
    somethingsWrong("Cannot create account");
  }

  userRegister.value = initialUserData();

  password.value = "";
  passwordConfirm.value = "";

  loading.value = false;
}
</script>
