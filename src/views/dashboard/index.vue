<template>
  <div class="dashboard-container">
    <div class="dashboard-titleBox">
      <div class="dashboard-title">欢迎使用xxxxx系统</div>
    </div>
    <!-- 显示项目 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <!-- 折线图 -->
    <line-chart/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import lineChart from './components/lineChart'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'Dashboard',
  components: { lineChart, PanelGroup },
  data: function() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = [1]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-titleBox {
    color: rgb(48, 65, 86);
    text-align: center ;
    padding: 30px 0 40px 0;
    margin-bottom: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-title {
    font-size: 40px;
    line-height: 46px;
  }
}
</style>
