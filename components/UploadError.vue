<script setup>
const props = defineProps(["errorType"]);
const { errorType } = toRefs(props);

const error = ref("");

watch(
  () => errorType.value,
  () => {
    if (errorType.value == "caption") {
      error.value = "Maximun 150 characteres.";
    } else if (errorType.value == "bio") {
      error.value = "Maximun 80 characteres.";
    } else if (errorType.value == "file") {
      error.value = "Unsupported file. Use MP4 instead";
    } else {
      error.value = "";
    }
  }
);
</script>

<template>
  <div class="relative flex w-full justify-center">
    <div
      :class="errorType ? 'visible' : 'invisible'"
      class="absolute top-6 z-50 mx-auto rounded-sm bg-black bg-opacity-70 px-14 py-3 text-white"
    >
      {{ error }}
    </div>
  </div>
</template>
