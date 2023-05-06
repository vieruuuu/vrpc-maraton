<template>
  <div>
    <q-form ref="formRef" @submit="submit">
      <q-card class="q-mb-md" bordered flat>
        <div class="text-h4 text-center q-my-lg q-px-md">
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
            autogrow
            type="text"
          />
          <q-input
            v-model="job.idealCandidate"
            class="col-12"
            outlined
            label="Ideal Candidate"
            :rules="[(val) => Job.shape.idealCandidate.safeParse(val).success]"
            hide-bottom-space
            autogrow
            type="text"
          />

          <div class="q-gutter-sm col-12">
            <div class="text-body1">Required Badges:</div>

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

          <div class="q-gutter-sm col-12">
            <div class="text-body1">Bounty reward:</div>

            <q-radio
              v-for="payment in JobPayments"
              :key="payment"
              v-model="job.payment"
              :val="payment"
              :label="payment"
              color="primary"
            />
          </div>

          <div>
            <q-btn label="Set bounty" type="submit" :loading="loading" />
          </div>
        </q-card-section>

        <q-inner-loading
          style="background-color: rgba(255, 255, 255, 0.95)"
          :showing="jobPosted"
        >
          <div class="text-h5 text-center q-mb-md">Bounty posted!</div>

          <q-btn
            outline
            label="Post another bounty"
            color="light-green-7"
            @click="jobPosted = false"
          />
        </q-inner-loading>
      </q-card>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { formatBadgeName } from "common/lib/quizzes";
import { formatJobLevel } from "common/lib/jobs";
import { Job, JobLevels, JobPayments } from "types/job";
import { QuizBadges } from "types/quizzes";
import { addDocument, updateDocument } from "@/lib/firestore";
import { arrayUnion } from "firebase/firestore/lite";

const { user } = useAuthStore();

const initialJobData = (): Job => ({
  id: "",
  description: "",
  requiredBadges: [],
  title: "",
  idealCandidate: "",
  level: "junior",
  payment: "1500$-2000$",
  companyId: "",
});

const job = ref<Job>(initialJobData());

const loading = ref(false);
const jobPosted = ref(false);

const formRef = ref<{ resetValidation: () => void; reset: () => void }>();

async function submit() {
  loading.value = true;
  jobPosted.value = false;

  const jobId = await addDocument("jobs", {
    ...job.value,
    companyId: user.value.id,
  });

  await updateDocument("users", user.value.id, {
    jobIds: arrayUnion(jobId),
  });

  job.value = initialJobData();

  if (formRef.value) {
    formRef.value.resetValidation();
    formRef.value.reset();
  }

  somethingsGood("Bounty posted!");

  jobPosted.value = true;
  loading.value = false;
}
</script>
