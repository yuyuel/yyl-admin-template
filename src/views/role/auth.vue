<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23"><div class="control-strip">
        <el-button type="primary" @click="handeleNewAdd()"> 新增 </el-button>
      </div></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="resultData.evaluateList"
      element-loading-text="Loading"
      border
      fit
      stripe
      highlight-current-row>
      <el-table-column type="index" width="60" align="center"/>
      <el-table-column label="角色名称" align="center" prop="roleName" />
      <el-table-column label="操作时间" align="center" min-width="180px" prop="updateTime" />
      <el-table-column label="操作员" align="center" prop="updatePin" />
      <el-table-column class-name="status-col" label="操作" width="180" align="left" header-align="center"	fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.roleCode,scope.row.roleName)">编辑</el-button>
          <el-button v-show="scope.row.id != 1" type="danger" @click="handelRemoveRole(scope.row.roleCode)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建用户 -->
    <el-dialog
      :title="dialogTittle"
      :visible.sync="dialog"
      width="70%"
      top="10vh"
      center>
      <el-form ref="form" :model="form" label-width="120px" height=" 500px" auto-complete="on">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" placeholder="请填写角色名称" />
        </el-form-item>
        <el-form-item label="权限菜单">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选权限</el-checkbox>
        </el-form-item>
        <el-form-item v-for="(items,index) in rolesList" :key="index" :label="items.resourceType">
          <el-checkbox-group v-model="checkedList" @change="handleCheckedChange" >
            <el-checkbox v-for="item in items.subResourceInfoList" :label="item.resourceCode" :key="item.resourceCode" >{{ item.resourceName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="inputRoleAdd()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isStringLength } from '@/utils/validate'
import { roleMap } from '../../router'
export default {
  data() {
    return {
      resultData: {
        evaluateList: [
          { 'id': 1, 'roleCode': '1233', 'roleName': '超级管理员', 'updatePin': '操作人', 'updateTime': '2018-10-19 20:17:57' },
          { 'id': 2, 'roleCode': '234', 'roleName': '次级管理员', 'updatePin': '操作人', 'updateTime': '2018-10-19 20:17:57' }
        ]
      },
      listLoading: false,
      dialog: false,
      dialogTittle: '',
      succseeTittle: '',
      checkAll: false,
      checkAllList: [],
      checkedList: [],
      form: {},
      rolesList: []
    }
  },
  mounted() {
    this.rolesList = roleMap
    this.fetchData()
  },
  methods: {
    fetchData(pageNo = 1) {
      this.listLoading = false
    },
    fetchOptionsList() {
      this.checkedList = ['11', '21']
      this.dealOptionsList(this.checkedList)
    },
    dealOptionsList(checkedList) {
      // 处理chekBox
      this.checkAllList = []
      roleMap.map(items => {
        items.subResourceInfoList.map(item => {
          this.checkAllList.push(item.resourceCode)
        })
      })
      if (this.checkedList.length == this.checkAllList.length) {
        this.checkAll = true
        this.checkedList = this.checkAllList
      } else {
        this.checkAll = false
      }
    },
    handleCheckAllChange(value) {
      if (value == true) {
        this.checkedList = this.checkAllList
      } else {
        this.checkedList = []
      }
    },
    handleCheckedChange(value) {
      if (this.checkedList.length == this.checkAllList.length) {
        this.checkAll = true
        this.checkedList = this.checkAllList
      } else {
        this.checkAll = false
      }
    },
    handelRemoveRole(id) {
      this.$confirm('确认删除角色?', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消' })
      })
    },
    inputRoleAdd() {
      if (isStringLength(this.form.roleName, 20) == 1) {
        this.$message({ type: 'error', message: '角色名称过长!' }); return false
      } else if (isStringLength(this.form.roleName, 20) == 0) {
        this.$message({ type: 'error', message: '请输入角色名称!' }); return false
      }
      if (this.checkedList.length == 0) {
        this.$message({ type: 'error', message: '角色权限不能为空!' }); return false
      }
      this.form.resourceCodeList = this.checkedList
      console.log(this.form)
    },
    handleEdit(roleCode, name) {
      this.dialogTittle = '编辑角色'
      this.succseeTittle = '编辑成功'
      this.succseeTittle
      this.form.roleName = name
      this.form.roleCode = roleCode
      this.fetchOptionsList(roleCode)
      this.dialog = true
      this.handleCheckedChange()
    },
    handeleNewAdd() {
      this.form.roleName = ''
      this.form.roleCode = ''
      this.dialogTittle = '新增角色'
      this.succseeTittle = '新增成功'
      this.fetchOptionsList()
      this.dialog = true
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
.el-form-item{
  margin-bottom: 5px
}
</style>
