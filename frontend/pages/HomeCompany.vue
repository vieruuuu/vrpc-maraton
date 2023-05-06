<template>
  <div class="q-ma-lg">
    <div class="flex-center row">
      <div class="q-my-lg col-12">
        <div class="text-h4">Howdy Sherif!</div>
        <div class="text-body1">Happy to see you searching for talents</div>
      </div>
      <div class="col-12 row justify-center">
        <q-card class="q-mb-md" style="max-width: 1500px" bordered>
          <div class="text-h4 text-center q-my-lg">
            <q-icon name="star" color="amber-14" />Post a bounty<q-icon
              name="star"
              color="amber-14"
            />
          </div>
          <q-form class="q-mx-xl q-my-md row q-col-gutter-md">
            <q-input class="col-12" outlined label="Bounty title" />
            <q-input class="col-12" outlined label="Description" />
            <q-input class="col-12" outlined label="Ideal Candidate" />
            <q-select
              v-model="model"
              class="col-4"
              square
              outlined
              :options="options"
              label="Required Badges"
              behavior="dialog"
              multiple
              use-chips
            />
            <q-select
              v-model="model2"
              class="col-4"
              square
              outlined
              :options="options2"
              label="Bounty level"
              behavior="dialog"
            />
            <q-select
              v-model="model1"
              class="col-4"
              square
              outlined
              :options="options1"
              label="Bounty Type"
              behavior="dialog"
            />
            <div>
              <q-btn label="Set bounty" />
            </div>
          </q-form>
        </q-card>
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

<script setup>
import { ref } from "vue";

const options = ref([]);
const model = ref([]);
const model1 = ref();
const options1 = ref([]);
const options2 = ref([]);
const model2 = ref();

const bounty = ref({});

bounty.value = {
  title: "JS developer",
  description: "Looking for high skilled front end dev",
  users: [
    {
      name: "Nicu paleru",
      lastOnline: "12.05.2023",
      badges: ["TS", "JS", "HTML"],
      id: "11",
    },
    {
      name: "Nicu Oieru",
      lastOnline: "17.04.2023",
      badges: ["TS", "JS", "HTML"],
      id: "1",
    },
    {
      name: "Nicu Boieru",
      lastOnline: "18.06.2023",
      badges: ["TS", "JS", "HTML"],
      id: "12",
    },
  ],
};

options2.value = ["Junior", "Mid-level", "Senior"];
options1.value = ["Part-time", "Full-time"];
options.value = ["JS", "TS", "HTML", "CSS", "C", "C++", "C#"];
</script>
