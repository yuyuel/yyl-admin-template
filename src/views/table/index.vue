<template>
  <div class="app-container">
    <!-- 顶部操作栏 -->
    <div class="filter-container">
      <el-input v-model="searchObj.title" placeholder="搜索内容" style="width: 200px;" class="filter-item"/>
      <el-select v-model="searchObj.type" placeholder="请选择" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in ptionsList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" >
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" >
        添加
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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" prop="name" width="105"/>
      <el-table-column label="描述" prop="title" />
      <el-table-column label="浏览量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{}">
          <el-button type="primary" size="mini" >
            修改
          </el-button>
          <el-button size="mini" type="success">
            编辑
          </el-button>
          <el-button size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination :hidden="listQuery.total == 0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" :auto-scroll="false" @pagination="pageGetList"/>

  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
      }
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
    }
  }
}
</script>
