<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li v-for="project in projects" :key="project">{{ project }}</li>
    </ul>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      projects: [],
    };
  },
  async created() {
    const response = await api.get("/projects");
    this.projects = response.data;
  },
};
</script>

