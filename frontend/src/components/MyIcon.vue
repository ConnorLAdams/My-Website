<template>
  <img alt="Pyrrhus Icon" :src="pyrrhus_icon" />
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      pyrrhus_icon: "", // Will store the base64 string
    };
  },
  async created() {
    try {
      // Fetch raw bytes from the API
      const response = await api.get("/pyrrhus2/Red_Panda_Tab.png", {
        responseType: "arraybuffer", // Request the raw bytes
      });

      // Convert the ArrayBuffer to a Base64 string
      console.log("Response:", response.data);
      const base64String = this.arrayBufferToBase64(response.data);

      // Set the src with the Base64 string
      this.pyrrhus_icon = `data:image/png;base64,${base64String}`;

      console.log("Base64 Image:", this.pyrrhus_icon);
    } catch (error) {
      console.error("Failed to fetch Pyrrhus icon:", error);
    }
  },
  methods: {
    // Helper function to convert ArrayBuffer to Base64
    arrayBufferToBase64(buffer) {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    },
  },
};
</script>

