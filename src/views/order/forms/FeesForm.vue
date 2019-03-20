<template>
  <div class="FeesForm">
    <div class="form-title">费用明细</div>
    <van-cell-group>
      <van-cell v-for="item of list" :key="item.title" :title="item.title" :value="item.value"/>
    </van-cell-group>

    <div class="form-title">合计</div>
    <van-cell-group>
      <van-cell title="税率" value="3%"/>
      <van-cell class="total" title="应付总额" value="3,123.00 CAD"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: '车辆租金', value: '200.00 CAD x 7 天' },
        { title: '全额险', value: '123.00 CAD x 7 天' },
        { title: '收费项目1', value: '100.00 CAD' },
        { title: '收费项目2', value: '300.00 CAD' }
      ]
    }
  }
}
</script>

<style lang="less">
.FeesForm {
  .van-cell__value {
    color: #f44;
  }
  .total {
    font-weight: bold;
  }
}
</style>

