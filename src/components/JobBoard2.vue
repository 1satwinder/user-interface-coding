<script setup>
import { ref, onMounted, watch } from "vue";
import JobDetailsCard from "./JobDetailsCard.vue";

const pageSize = 6;
const jobIds = ref([]);
const jobDetails = ref([]);
const page = ref(0);
const isLoading = ref(false);
const error = ref(null);

async function fetchJobIds() {
  try {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return await response.json();
  } catch (err) {
    error.value = "Failed to fetch job list.";
    console.error(err);
    return [];
  }
}

async function fetchJobs(currPage) {
  if (isLoading.value) return; // prevent concurrent fetches

  const start = currPage * pageSize;
  const end = start + pageSize;
  const ids = jobIds.value.slice(start, end);

  if (ids.length === 0) return; // No more jobs

  isLoading.value = true;
  error.value = null;

  try {
    const results = await Promise.all(
      ids.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => {
          if (!res.ok) throw new Error(`Job ${id} failed`);
          return res.json();
        })
      )
    );
    jobDetails.value.push(...results);
  } catch (err) {
    console.error("Error fetching job details", err);
    error.value = "Error loading job details.";
  } finally {
    isLoading.value = false;
  }
}

watch(page, () => {
  fetchJobs(page.value);
});

onMounted(async () => {
  jobIds.value = await fetchJobIds();
  if (jobIds.value.length) {
    fetchJobs(page.value);
  }
});
</script>

<template>
  <h2>Hacker News Jobs Board</h2>

  <div v-if="error" class="error">{{ error }}</div>

  <div class="job-list">
    <JobDetailsCard
      v-for="job in jobDetails"
      :key="job.id"
      :job="{ title: job.title, jobPoster: job.by, time: job.time }"
    />
  </div>

  <button class="load-more-button" :disabled="isLoading" @click="page++">
    {{ isLoading ? "Loading..." : "Load more jobs" }}
  </button>
</template>

<style scoped>
.job-list {
  width: 60vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  color: #ff6600;
}

.load-more-button {
  background-color: #ff6600;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-top: 20px;
  padding: 8px 12px;
}

.load-more-button:not(:disabled) {
  cursor: pointer;
}

.load-more-button:hover {
  background-color: #e65c00;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
