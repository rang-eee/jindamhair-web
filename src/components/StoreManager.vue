<template>
  <div>
    <waiting v-if="loaded==false" />
    <store-list
      v-if="loaded"
      listIcon="mdi-office-building"
      listTitle="헤어샵 관리"
      :headers="headers"
      :items="items"
      @submitItem="submitItem"
      @modifyItem="modifyItem"
      @deleteItem="deleteItem"
    >
    </store-list>
  </div>
</template>

<script>
export default {
  name: "StoreManager",
  props: {},
  data: () => ({
    headers: [
      {
        text: "생성일",
        align: "start",
        sortable: true,
        value: "createAt",
      },
      {
        text: "이름",
        align: "start",
        sortable: true,
        value: "title",
      },
      {
        text: "주소",
        align: "start",
        sortable: true,
        value: "address",
      },
    ],
    items: [],
    loaded: false,
  }),
  mounted: async function () {
    this.items = await this.$database.loadStores();
    this.loaded = true;
  },
  methods: {
    async submitItem(item) {
      item.createAt = this.$database.currentTimestamp();
      await this.$database.addStore(item);
      this.loaded = false;
      this.items = await this.$database.loadStores();
      this.loaded = true;
    },
    async modifyItem(item) {
      await this.$database.editStore(item.id, item);
      this.loaded = false;
      this.items = await this.$database.loadStores();
      this.loaded = true;
    },
    async deleteItem(id) {
      await this.$database.deleteStore(id);
      this.loaded = false;
      this.items = await this.$database.loadStores();
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
</style>