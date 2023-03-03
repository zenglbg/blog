<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-scrollbar>
          <el-row>
            <el-col :span="18" class="center"> <slot /></el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
 

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-container',
  setup () {
    return {}
  }
})
</script>
 
 
<style lang="scss">
.common-layout {
  height: 100vh;
}

.center {
  margin: 0 auto;
}
</style>
