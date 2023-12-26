<template>
  <v-list-item
    link
    :style="
      $utils.itemStyle(selectedMenu == index, 'background-color', '#FFFFFF')
    "
    @click="$emit('onClickList', index)"
  >
    <v-list-item-icon>
      <v-icon
        :style="
          $utils.itemStyle(selectedMenu == index, 'color', '#FFFFFF') +
          ';' +
          $utils.itemStyle(selectedMenu != index, 'color', $theme.darkGrey)
        "
        >{{icon}}</v-icon
      >
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title
        :style="
          $utils.itemStyle(selectedMenu == index, 'color', '#FFFFFF') +
          ';' +
          $utils.itemStyle(selectedMenu != index, 'color', $theme.darkGrey)
        "
        >{{name}}</v-list-item-title
      >
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    name: {
      default: "",
    },
    icon: {
      default: "",
    },
    index: {
      default: 0,
    },
    selectedMenu: {
      default: 0,
    },
  },
  data: () => ({}),
  mounted: function () {},
  methods: {},
};
</script>

<style scoped>
</style>