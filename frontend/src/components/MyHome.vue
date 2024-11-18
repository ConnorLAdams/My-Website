<template>
  <div>
    <h1>Welcome to My Website</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      message: "",
    };
  },
  async created() {
    const response = await api.get("/");
    this.message = response.data;
  },
};
</script>

