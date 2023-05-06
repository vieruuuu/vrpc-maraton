<template>
  <div class="q-ma-lg">
    <div class="flex-center row">
      <div class="q-my-lg col-12">
        <div class="text-h4">Howdy Sherif!</div>
        <div class="text-body1">Happy to see you searching for talents</div>
      </div>
      <div class="col-12 row justify-center">
        <job-submit />
      </div>
    </div>

    <div class="text-h4 q-mb-md">Your bounties:</div>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div
          v-for="i in 4"
          :key="i"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md"
        >
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h4 text-center">Wanted</div>
              <div class="text-h6 text-center">
                {{ bounty.title }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-body2">
                <div class="text-body1 text-bold">Description:</div>
                {{ bounty.description }}
              </div>
            </q-card-section>
            <q-separator />
            <div class="q-mb-md">
              <div v-for="user in bounty.users" :key="user.id">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ user.name }}</q-item-label>
                    <q-item-label caption>{{ user.lastOnline }} </q-item-label>
                  </q-item-section>
                </q-item>

                <div class="full-width row q-col-gutter-md justify-end">
                  <div class="col-4">
                    <q-btn
                      flat
                      color="black"
                      class="fit"
                      label="Profile"
                      no-caps
                    />
                  </div>
                  <div class="col-4">
                    <q-btn
                      outline
                      class="fit"
                      color="orange-10"
                      label="Place bounty"
                    />
                  </div>
                </div>
              </div>
            </div>

            <q-separator></q-separator>
            <q-card-actions>
              <q-btn
                class="col-12"
                label="Terminate Bounty"
                color="red"
                outline
              ></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JobSubmit from "@@/job-submit.vue";

const bounty = ref<any>({});
</script>
