<template>
  <q-card>
    <div>
      <q-card-section class="bg-secondary">
        <q-item>
          <q-item-section avatar>
            <user-image :user="user" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">
              {{ formatUserName(user) }}
            </q-item-label>
            <q-item-label class="text-black text-body1">
              <span class="text-bold">Member since:</span>
              {{ formatDate(user.registerDate) }}
            </q-item-label>
            <q-item-label class="text-black text-body1">
              <span class="text-bold">Last login:</span>
              {{ formatDate(user.lastLogin) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <template v-if="user.details.type === 'candidate'">
        <div class="q-ma-lg">
          <div class="text-bold text-h6">Personal description</div>
          <div class="text-body1">
            Worked on 2 projects for the company: CMS and a broker website.
            Learned to work with Ubuntu, Bash, Github. Implemented new features
            and helped solve problems. Collaborated with a small team to find
            solutions that will benefit the projects.
          </div>
          <div>
            <div class="text-h6 text-bold q-mt-sm">Earned Badges:</div>
            <div class="row q-col-gutter-md">
              <div v-for="badge in user.badges" :key="badge">
                <q-badge
                  :label="formatBadgeName(badge)"
                  outline
                  :color="formatBadgeColor(badge)"
                  class="text-subtitle2 text-bold"
                />
              </div>
            </div>
          </div>
          <div class="q-my-md">
            <div class="text-bold text-h6">Info:</div>

            <div class="text-body1">
              <div>Email: {{ user.email }}</div>
              <div>Phone: 0774 457 666</div>
              <div>Address: Romania, Iasi</div>
            </div>
          </div>

          <div class="text-h6">Personality traits:</div>
          <div class="row flex-center">
            <div class="col-xs-12 col-lg-5">
              <radar class="fit" :data="chartData1" :options="chartOptions" />
            </div>
            <div class="col-xs-12 col-lg-5">
              <radar class="fit" :data="chartData2" :options="chartOptions" />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="q-ma-lg">
          <div class="text-bold">Description</div>
          <div>
            Our company is a new ,reliable and innovation focused company. We
            work hard to promote your brand and reach new customers. Our team is
            knowledgeable about the latest in online marketing, social media,
            and search engine optimization. We have an intense focus on driving
            conversions and increasing sales for our clients.
          </div>
          <div class="q-my-md">
            <div class="text-bold text-body1">Info:</div>
            <div>Email:{{ user.email }}</div>
            <div>Phone: 0774 777 666</div>
            <div>HQ:Romania , Iasi</div>
          </div>
        </div>
      </template>

      <slot />
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { formatUserName } from "common/lib/users";
import { formatDate } from "common/lib/date";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import type { User } from "types/users";
import UserImage from "./user-image.vue";
import { formatBadgeColor, formatBadgeName } from "common/lib/quizzes";

defineProps<{
  user: User;
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const labels1 = [
  "Architect",
  "Logician",
  "Commander",
  "Debater",
  "Advocate",
  "Mediator",
  "Protagonist",
  "Campaigner",
];
const labels2 = [
  "Logistician",
  "Defender",
  "Executive",
  "Consul",
  "Virtuoso",
  "Adventurer",
  "Entrepreneur",
  "Entertainer",
];

const chartData1 = ref({
  labels: labels1,
  datasets: [
    {
      data: labels1.map(() => getRandomArbitrary(0, 20)),
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
});
const chartData2 = ref({
  labels: labels2,
  datasets: [
    {
      data: labels2.map(() => getRandomArbitrary(0, 20)),
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
});

const chartOptions = ref({
  plugins: {
    legend: {
      display: false,
    },
  },

  elements: {
    line: {
      borderWidth: 3,
    },
  },

  responsive: true,
});
</script>
