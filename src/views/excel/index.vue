<template>
  <div class="app-container">
    <!-- 顶部操作栏 -->
    <div class="filter-container">
      <el-button :loading="downloadLoading" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleExport" >
        导出 Excel
      </el-button>
    </div>

    <!-- 表单 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" prop="name" width="105"/>
      <el-table-column label="描述" prop="title" />
      <el-table-column label="浏览量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
        filename: '',
        autoWidth: true,
        bookType: 'xlsx'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      searchObj: {},
      ptionsList: ['1', '2', '3'],
      listQuery: {
        total: 0,
        page: 1,
        limit: 20
      },
      downloadLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listQuery.total = response.data.total
        this.listLoading = false
      })
    },
    pageGetList() {
      this.fetchData()
    },
    handleExport() {
      this.downloadLoading = true
      import('../../vendor/Export2Excel.js').then(excel => {
        const tHeader = ['ID', '姓名', '描述', '浏览量', '时间']
        const filterVal = ['id', 'name', 'title', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
