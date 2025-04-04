<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://cdn.pulse.is/livechat/loader.js";
  script.setAttribute("data-live-chat-id", "67efd120a3b3b16ebf0110d0");
  script.async = true;
  document.body.appendChild(script);
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
