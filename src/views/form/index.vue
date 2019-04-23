<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="选项">
        <el-select v-model="form.region" placeholder="选项1">
          <el-option label="选项1" value="1"/>
          <el-option label="选项2" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="选择时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="开关">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="多选">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="1" name="type"/>
          <el-checkbox label="2" name="type"/>
          <el-checkbox label="3" name="type"/>
          <el-checkbox label="4" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本框">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="success" @click="onCancel">成功</el-button>
        <el-button type="warning" @click="onCancel">修改</el-button>
        <el-button type="danger" @click="onCancel">删除</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-container>
      <el-header height="50px">
        减少页面数。表单提交一般做成弹窗形式
      </el-header>
      <el-main>
        <el-button type="primary" @click="normalDialogShow = true">基础弹窗</el-button>
        <el-button type="primary" @click="fullDialogShow = true">全屏弹窗</el-button>
      </el-main>
    </el-container>

    <el-dialog
      :visible.sync="normalDialogShow"
      width="50%"
      title="基础弹窗"
      center
      append-to-body
      top="7vh">
      <el-container>
        <el-header height="50px">
          <h3>用于基础的提交</h3>
        </el-header>
        <el-main>
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="选项">
              <el-select v-model="form.region" placeholder="选项1">
                <el-option label="选项1" value="1"/>
                <el-option label="选项2" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-time-picker v-model="form.date2" type="fixed-time" placeholder="选择时间" style="width: 100%;"/>
              </el-col>
            </el-form-item>
            <el-form-item label="开关">
              <el-switch v-model="form.delivery"/>
            </el-form-item>
            <el-form-item label="多选">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="1" name="type"/>
                <el-checkbox label="2" name="type"/>
                <el-checkbox label="3" name="type"/>
                <el-checkbox label="4" name="type"/>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="单选">
              <el-radio-group v-model="form.resource">
                <el-radio label="男"/>
                <el-radio label="女"/>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文本框">
              <el-input v-model="form.desc" type="textarea"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="success" @click="onCancel">成功</el-button>
              <el-button type="warning" @click="onCancel">修改</el-button>
              <el-button type="danger" @click="onCancel">删除</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-dialog>

    <el-dialog
      :visible.sync="fullDialogShow"
      fullscreen
      title="全屏弹窗"
      center
      append-to-body>
      <el-container>
        <el-main>
          用于展示大内容
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      normalDialogShow: false,
      fullDialogShow: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

