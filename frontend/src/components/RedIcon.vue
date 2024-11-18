<template>
    <img alt="Pyrrhus Icon" :src="pyrrhus_icon" />
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      pyrrhus_icon: "",
    };
  },
  async created() {
      const response = await api.get("/pyrrhus", {
          responseType: "arraybuffer",
      });

    const b64String = this.arrayBufferToBase64(response.data);
    console.log(b64String);
    this.pyrrhus_icon = `data:image/png;base64,${b64String}`;
  },
  methods: {
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
