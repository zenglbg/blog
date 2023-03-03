<template>
  <div>
    <h1>
      <NuxtLink to="/chat/chat">前往chat页面</NuxtLink>
    </h1>
  </div>
</template>

<script setup>
// Define params wherever, through `defineProps()`, `useRoute()`, etc.
// const { data, pending, refresh } = await useAsyncData('getposts', () =>
//   $fetch(`http://localhost/post`),
// );

const { data: posts, refresh: getData } = await useFetch(
  'http://localhost/post',
);
console.log('🚀 ~ file: index.vue:25 ~ posts:', posts.value);
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

h2 {
  color: pink;
}
</style>
