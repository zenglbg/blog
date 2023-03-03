<template>
  <NuxtLink to="/">返回</NuxtLink>

  <el-row>
    <el-col :span="11">
      <el-form>
        <el-form-item>
          <el-input
            v-model="formText.prompt"
            placeholder="请输入开始文字"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleText"> QA </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="2"></el-col>
    <el-col :span="11" v-html="content"> </el-col>
  </el-row>

  <el-divider />

  <el-row>
    <el-col :span="11">
      <el-form>
        <el-form-item>
          <el-input
            v-model="formImg.prompt"
            placeholder="请输入图片描述"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleImg">点击获取图片</el-button>
        </el-form-item>
      </el-form></el-col
    >
    <el-col :span="2"></el-col>

    <el-col :span="11">
      <img :src="imgref" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const formText = reactive({
  prompt: '',
});
const content = ref('');
const setContent = (val: string) => (content.value = val);
function handleText() {
  const loadingInstance = ElLoading.service({ text: '加载中...' });
  getText({ prompt: formText.prompt })
    .then((res) => {
      loadingInstance.close();
      setContent(res.value);
    })
    .catch((_) => loadingInstance.close());
}

const formImg = reactive({
  prompt: '',
});
const imgref = ref();
const setImg = (val: string) => (imgref.value = val);
function handleImg() {
  const loadingInstance = ElLoading.service({ text: '加载中...' });
  getImg({ prompt: formImg.prompt })
    .then((res) => {
      loadingInstance.close();
      setImg(res.value);
    })
    .catch((_) => loadingInstance.close());
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
