<template>
  <div>
    <h2>
      <button @click="refresh">posts</button>

      <div class="posts">
        <ul>
          <li v-for="item in data">
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
const { data, pending, refresh } = await useAsyncData('getposts', () =>
  $fetch(`http://localhost/post`),
);

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
