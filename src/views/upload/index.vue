<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <el-form-item prop="content" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="postForm.content" :height="400" :uploadshow="false"/>
      </el-form-item>
    </el-form>
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :output-size="option.size"
      :output-type="option.outputType"
      :info="true"
      :full="option.full"
      :can-move="option.canMove"
      :can-move-box="option.canMoveBox"
    />
    <button @click="upload">看看</button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { VueCropper } from 'vue-cropper'

export default {
  components: { Tinymce, VueCropper },
  data: function() {
    return {
      postForm: {},
      option: {}
    }
  },
  methods: {
    upload() {
      console.log(this.postForm.content)
    }
  }
}
</script>

<style>

</style>
