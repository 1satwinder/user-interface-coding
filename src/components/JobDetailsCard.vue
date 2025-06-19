<script setup lang="ts">
interface Props {
  job: {
    title: string;
    jobPoster: string;
    time: string;
    link?: string;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <div class="job-card">
    <div class="job-card-header">
      <div class="job-title">
        <h3>{{ props.job.title }}</h3>
      </div>
    </div>
    <div class="job-card-body">
      <p>
        By {{ props.job.jobPoster }} .
        {{ new Date(props.job.time).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.job-card {
  background-color: lightgray;
}
</style>
