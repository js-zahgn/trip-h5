<template>
  <Frame :tab="1" class="p-mine">
    <div class="personal">
      <div class="info">
        <div class="imgBox">
          <img :src="info.avator" alt width="100%" height="100%">
        </div>
        <span>{{info.name}}</span>
      </div>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell title="我的订单" is-link to="/orders"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="意见反馈" is-link/>
        <van-cell title="联系我们" is-link value="400-888-8888"/>
      </van-cell-group>
    </div>
  </Frame>
</template>
<script>
import Frame from '@/views/Frame'
export default {
  components: { Frame },
  data() {
    return {
      info: {
        name: 'Lam',
        avator: ''
      }
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.p-mine {
  .personal {
    height: 150px;
    background-color: @color-orange;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 50px;

    .imgBox {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      margin-bottom: 10px;
      display: flex;
    }

    span {
      font-size: 17px;
    }
  }

  .van-cell-group ~ .van-cell-group {
    margin-top: 20px;
  }
}
</style>

