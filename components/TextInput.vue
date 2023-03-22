<script setup>
const emit = defineEmits(["update:input"]); //en lugar de modelValue usamos input como valor custom

const props = defineProps([
  "input",
  "placeholder",
  "inputType",
  "max",
  "autoFocus",
  "error",
]);

const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props);

onMounted(() => {
  if (autoFocus.value) {
    document.getElementById(`input-${placeholder.value}`).focus();
  }
});

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
// Usar computed o esto
// :value="input"
// @input="$emit('update:input', $event.target.value)"
</script>

<template>
  <div class="">
    <input
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      :type="inputType"
      v-model="inputComputed"
      autocomplete="off"
      :maxlength="max"
      class="block w-full rounded-md border border-gray-300 bg-[#F1F1F2] py-2.5 px-3 text-gray-800 focus:outline"
    />
    <span v-if="error" class="text-[14px] font-semibold text-red-500">
      {{ error }}</span
    >
  </div>
</template>
