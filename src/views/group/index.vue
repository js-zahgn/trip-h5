<template>
  <Page title="选车" class="Group">
    <Heading/>
    <GroupItem v-for="item in this.groups" :key="item.id" :data="item"/>
  </Page>
</template>
<script>
import store from "@/store";
import { groupApi } from "@/api";
import Heading from "./partials/Heading";
import GroupItem from "./partials/GroupItem";
export default {
  components: { Heading, GroupItem },
  data() {
    return {
      groups: [],
      page: 1,
      total: 0,
      order: store.state.order
    };
  },

  methods: {
    async fetch() {
      const params = {
        page: this.page,
        fromTime: this.order.fromTime,
        toTime: this.order.toTime
      };
      const data = await groupApi.getGroups(params);
      this.groups.splice(this.groups.length, 0, ...data.list);
      return this.groups;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>

