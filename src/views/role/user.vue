<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23"><div class="control-strip">
        <el-button type="primary" @click="handleAddClick()"> 新增 </el-button>
      </div></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="index" width="60" align="center"/>
      <el-table-column label="所属角色" align="center" prop="roleName"/>
      <el-table-column label="登录用户名称" align="center" prop="account"/>
      <el-table-column label="真实姓名" align="center" prop="name"/>
      <el-table-column label="是否注销" align="center" >
        <template slot-scope="scope">
          {{ scope.row.yn | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" min-width="150px;" prop="updateTime"/>
      <el-table-column label="操作员" align="center" prop="updatePin"/>
      <el-table-column class-name="status-col" label="操作" width="210" align="left" header-align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleRepwd(scope.row.id)">重置密码</el-button>
          <el-button v-show="scope.row.yn == 1" type="danger" @click="removeBgm(scope.row.id)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建用户 -->
    <el-dialog
      :visible.sync="dialog"
      title="新建用户"
      width="35%"
      top="10vh"
      center>
      <el-form ref="form" :model="form" label-width="120px" height=" 500px" auto-complete="on">
        <el-form-item label="所属角色：">
          <el-select v-model="form.roleCode" placeholder="请选择" clearable>
            <el-option
              v-for="item in selects"
              :key="item.roleCode"
              :label="item.roleName"
              :value="item.roleCode"/>
          </el-select>
        </el-form-item>
        <el-form-item label="登录用户名称：">
          <el-input v-model="form.account" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="初始密码：">
          <el-input v-model="addPassword" placeholder="请填写" type="password"/>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="form.name" placeholder="请填写" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="inputBgmAdd()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isStringLength, isPassword } from '@/utils/validate'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '否',
        '1': '是'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listData: [
        { 'account': 'liuyuchen', 'id': 1, 'name': '张三', 'roleName': '角色', 'updatePin': '操作人', 'updateTime': '2018-10-18 01:56:33', 'yn': 1 },
        { 'account': 'liuyuchen', 'id': 1, 'name': '张三', 'roleName': '角色', 'updatePin': '操作人', 'updateTime': '2018-10-18 01:56:33', 'yn': 0 }
      ],
      listLoading: true,
      dialog: false,
      form: {},
      addPassword: '',
      selects: [],
      listQuery: {
        pageSize: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(pageNo = 1) {
      this.listQuery.pageNo = pageNo
      this.listLoading = false
    },
    handleAddClick() {
      this.selects = [
        { 'roleCode': '1233', 'roleName': '超级管理员' },
        { 'roleCode': '2341', 'roleName': '省级经销商' },
        { 'roleCode': '234', 'roleName': '市级经销商' }
      ]
      this.dialog = true
    },
    inputBgmAdd() {
      if (!this.form.roleCode) {
        this.$message({ type: 'error', message: '请选择所属角色' }); return false
      }
      if (isStringLength(this.form.account, 20) === 1) {
        this.$message({ type: 'error', message: '登录用户名称过长!' }); return false
      } else if (isStringLength(this.form.account, 20) === 0) {
        this.$message({ type: 'error', message: '请输入登录用户名称!' }); return false
      }

      if (isPassword(this.addPassword) === false) {
        this.$message({ type: 'error', message: '初始密码必须为8-16位的数字加字母的格式' }); return false
      }

      if (isStringLength(this.form.name, 20) === 1) {
        this.$message({ type: 'error', message: '真实姓名过长!' }); return false
      } else if (isStringLength(this.form.name, 20) === 0) {
        this.$message({ type: 'error', message: '请输入真实姓名!' }); return false
      }
    },
    removeBgm(id) {
      this.$confirm('确认注销用户？', '注销用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消' })
      })
    },
    handleRepwd(id) {
      this.$prompt('请输入新密码', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
        inputErrorMessage: '密码必须为8-16位的数字加字母的格式'
      }).then(({ value }) => {

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.control-strip{
    height: 60px;
    button{
        margin-right: 30px;
    }
}
</style>
