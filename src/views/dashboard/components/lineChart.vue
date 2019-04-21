<template>
  <div class="asd">
    <ve-line :data="chartData" :settings="chartSettings"/>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      metrics: ['项目一', '项目二'],
      dimension: ['日期']
    }
    return {
      chartData: {
        columns: ['日期', '项目一', '项目二'],
        rows: [
          { '日期': '1/1', '项目一': 1393, '项目二': 1093 },
          { '日期': '1/2', '项目一': 3530, '项目二': 3230 },
          { '日期': '1/3', '项目一': 2923, '项目二': 2623 },
          { '日期': '1/4', '项目一': 1723, '项目二': 1423 },
          { '日期': '1/5', '项目一': 3792, '项目二': 3492 },
          { '日期': '1/6', '项目一': 4593, '项目二': 4293 }
        ]
      }
    }
  }
}
</script>

<style>

</style>
