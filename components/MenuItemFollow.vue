<script setup>
const props = defineProps(["user"]);
</script>

<template>
  <div
    class="flex w-full items-center rounded-md py-1.5 px-2 hover:bg-gray-100"
  >
    <img
      class="mx-auto rounded-full lg:mx-0"
      width="35"
      :src="user.image"
      alt=""
    />
    <div class="hidden lg:block lg:pl-2.5">
      <div class="flex items-center">
        <div class="text-[14px] font-bold">{{ props.user.name }}</div>

        <div class="relative ml-1 h-[14px] rounded-full bg-[#58d5ec]">
          <Icon
            class="relative -top-[7px]"
            name="teenyicons:tick-small-solid"
            color="#FFFFFF"
            size="15"
          ></Icon>
        </div>
      </div>

      <div class="text-[12px] font-light">{{ props.user.name }}</div>
    </div>
  </div>
</template>
