<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="resultData.evaluateList"
      element-loading-text="Loading"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;">
      <el-table-column type="index" width="60" align="center"/>
      <el-table-column label="权限名称" align="center" prop="resourceName" />
      <el-table-column label="是否生效" align="center" >
        <template slot-scope="scope">
          {{ scope.row.yn | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center" prop="updateTime"/>
      <el-table-column label="操作员" align="center" prop="updatePin"/>
      <el-table-column class-name="status-col" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.yn == 1"
            type="primary"
            @click="openResource(scope.row.resourceCode)">开 启</el-button>
          <el-button
            v-if="scope.row.yn == 0"
            type="danger"
            @click="closeResource(scope.row.resourceCode)">关 闭</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row>
      <el-col :span="24"><div class="pagination">
        <el-pagination
          v-show="resultData.totalCount> listQuery.pageSize"
          :size="resultData.pageSize"
          :total="resultData.totalCount"
          :current-page="listQuery.pageNo"
          background
          layout="prev, pager, next"
          @current-change="fetchData"/>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '是',
        '1': '否'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      resultData: {
        evaluateList:
         [
           { 'resourceCode': '1233445', 'resourceName': 'xxx模块权限', 'sortNo': 0, 'updatePin': '操作人', 'updateTime': '2018-10-19 20:56:32', 'yn': 1 },
           { 'resourceCode': '2134445', 'resourceName': 'xxx模块权限', 'sortNo': 1, 'updatePin': '操作人', 'updateTime': '2018-10-19 20:56:32', 'yn': 0 }
         ]
      },
      listLoading: false,
      newAddBoxTitle: '新建权限',
      newAddBox: false,
      form: {},
      listQuery: {
        pageSize: 10
      }
    }
  },
  created() {
  },
  methods: {
    fetchData() {

    },
    edit() {
      this.newAddBoxTitle = '编辑权限'
      this.newAddBox = true
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
