<template>
  <div>
    <q-form>
      <q-card class="q-mb-md" bordered flat>
        <div class="text-h4 text-center q-my-lg">
          <q-icon name="star" color="amber-14" />
          Post a bounty
          <q-icon name="star" color="amber-14" />
        </div>
        <q-card-section class="row q-col-gutter-md">
          <q-input
            v-model="job.title"
            class="col-12"
            outlined
            label="Bounty title"
            :rules="[(val) => Job.shape.title.safeParse(val).success]"
            hide-bottom-space
          />
          <q-input
            v-model="job.description"
            class="col-12"
            outlined
            label="Description"
            :rules="[(val) => Job.shape.description.safeParse(val).success]"
            hide-bottom-space
          />
          <q-input
            v-model="job.idealCandidate"
            class="col-12"
            outlined
            label="Ideal Candidate"
            :rules="[(val) => Job.shape.idealCandidate.safeParse(val).success]"
            hide-bottom-space
          />

          <div class="q-gutter-sm col-12">
            <div class="text-body1">Required Badges (optional):</div>

            <q-checkbox
              v-for="badge in QuizBadges"
              :key="badge"
              v-model="job.requiredBadges"
              :val="badge"
              :label="formatBadgeName(badge)"
              color="primary"
            />
          </div>

          <div class="q-gutter-sm col-12">
            <div class="text-body1">Bounty level:</div>

            <q-radio
              v-for="level in JobLevels"
              :key="level"
              v-model="job.level"
              :val="level"
              :label="formatJobLevel(level)"
              color="primary"
            />
          </div>

          <div>
            <q-btn label="Set bounty" type="submit" />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { formatBadgeName } from "common/lib/quizzes";
import { formatJobLevel } from "common/lib/jobs";
import { Job, JobLevels } from "types/job";
import { QuizBadges } from "types/quizzes";

const job = ref<Job>({
  id: "",
  description: "",
  requiredBadges: [],
  title: "",
  idealCandidate: "",
  level: "junior",
});
</script>
