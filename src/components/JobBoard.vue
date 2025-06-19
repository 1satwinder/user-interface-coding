<script setup>
import { ref, onMounted, watch } from "vue";
import JobDetailsCard from "./JobDetailsCard.vue";

const page_size = 6;

const jobIds = ref([]);
const jobDetails = ref([]);
const page = ref(0);
const fetchingJobDetails = ref(false);

async function fetchJobIds() {
  try {
    const response = await fetch(
      " https://hacker-news.firebaseio.com/v0/jobstories.json"
    );
    if (!response.ok)
      throw new Error("Request Failed with status", response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch job List");
    throw error;
  }
}

async function fetchJobs(currPage) {
  const start = currPage * page_size;
  const end = start + page_size;
  const jobIdsForPage = jobIds.value.slice(start, end);
  fetchingJobDetails.value = true;
  const jobsForPage = await Promise.all(
    jobIdsForPage.map((jobId) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
        (res) => res.json()
      )
    )
  );
  jobDetails.value.push(...jobsForPage);

  fetchingJobDetails.value = false;
}

watch(page, () => {
  fetchJobs(page.value);
});

onMounted(async () => {
  jobIds.value = await fetchJobIds();
  fetchJobs(page.value);
  console.log("jobList", jobIds.value);
});
</script>

<template>
  <h2>Hacker News Jobs Board Pages</h2>
  <div class="job-list">
    <JobDetailsCard
      v-for="job in jobDetails"
      :key="job.id"
      :job="{ title: job.title, jobPoster: job.by, time: job.time }"
    ></JobDetailsCard>
  </div>
  <button
    class="load-more-button"
    :disabled="fetchingJobDetails"
    @click="page++"
  >
    {{ fetchingJobDetails ? "Loading..." : "Load more jobs" }}
  </button>
</template>

<style scoped>
.job-list {
  width: 60vw;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space between cards */
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
</style>
