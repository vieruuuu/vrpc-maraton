<template>
  <q-dialog v-if="user" v-model="showDialog" position="bottom">
    <user-account :user="user" />
  </q-dialog>
</template>

<script setup lang="ts">
import UserAccount from "./user-account.vue";

const props = defineProps<{ userId: string; modelValue: boolean }>();

const emit = defineEmits(["update:modelValue"]);

const showDialog = computed({
  set: (val) => emit("update:modelValue", val),
  get: () => props.modelValue,
});

const { users } = useUsersStore();

const user = computed(() => users.value.get(props.userId));
</script>
