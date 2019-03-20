<template>
  <div class="Price">
    <strong>{{number | money}}</strong>
    <span>{{unit}}</span>
  </div>
</template>

<script>
export default {
  name: "Price",
  props: {
    number: Number,
    unit: String
  }
};
</script>


<style lang="less">
.Price {
  display: inline-block;
  > strong {
    display: inline-block;
    color: #f44;
    font-size: 14px;
    font-weight: bold;
    margin-right: 3px;
  }
  > span {
    display: inline-block;
    font-size: 12px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.44);
  }
}
</style>
