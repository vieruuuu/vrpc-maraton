<template>
  <div class="q-ma-lg">
    <div class="flex-center row">
      <div class="q-my-lg col-12">
        <div class="text-h4">Howdy Sherif!</div>
        <div class="text-body1">Happy to see you searching for talents</div>
      </div>
      <div class="col-12 row justify-center">
        <q-card class="q-mb-md bg-secondary" style="max-width: 1500px" bordered>
          <div class="text-h4 text-center q-my-lg">
            <q-icon name="star" />Post a bounty<q-icon name="star" />
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
            <div class="col-12 items-center">
              <div class="text-body1 text-center col-12" color="secondary">
                Salary(hundreds dollars)
              </div>
              <q-slider
                v-model="model3"
                label
                label-always
                color="green"
                :min="0"
                :step="1"
                :max="20"
              />
            </div>
            <q-btn label="Set bounty" />
          </q-form>
        </q-card>
      </div>
    </div>

    <div class="text-h4">Your bounties:</div>
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
const model3 = ref();

options2.value = ["Junior", "Mid-level", "Senior"];
options1.value = ["Part-time", "Full-time"];
options.value = ["JS", "TS", "HTML", "CSS", "C", "C++", "C#"];
</script>
