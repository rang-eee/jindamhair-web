<template>
  <div>
    <waiting v-if="loaded==false" />
    <data-list
      v-if="loaded"
      listIcon="mdi-note-multiple"
      listTitle="데이터 관리"
      :headers="headers"
      :items="items"
      @submitItem="submitItem"
      @modifyItem="modifyItem"
      @deleteItem="deleteItem"
    >
    </data-list>
  </div>
</template>

<script>
export default {
  name: "DataManager",
  props: {},
  data: () => ({
    headers: [
      {
        text: "이름",
        align: "start",
        sortable: true,
        value: "name",
      },
    ],
    items: [],
    loaded: false,
  }),
  mounted: async function () {
    this.items = await this.$database.loadItems();
    this.loaded = true;
  },
  methods: {
    async submitItem(item) {
      await this.$database.addItem(item);
      this.loaded = false;
      this.items = await this.$database.loadItems();
      this.loaded = true;
    },
    async modifyItem(item) {
      await this.$database.editItem(item.id, item);
      this.loaded = false;
      this.items = await this.$database.loadItems();
      this.loaded = true;
    },
    async deleteItem(id) {
      await this.$database.deleteItem(id);
      this.loaded = false;
      this.items = await this.$database.loadItems();
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
</style>