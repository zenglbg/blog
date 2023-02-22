<template>
  <div>
    <h2>
      <button @click="getData">posts</button>

      <div class="posts" v-if="posts">
        <h1>
          {{ posts.length }}
        </h1>

        <ul>
          <li v-for="item in posts">
            <p>{{ item.title }}</p>
            <p>{{ item.content }}</p>
          </li>
        </ul>
      </div>
    </h2>
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
