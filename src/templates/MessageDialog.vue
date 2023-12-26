<template>
  <div>
    <v-dialog v-model="visible" width="300" persistent>
      <v-card>
        <v-card-title style="font-size: 16px;">
          <div v-html="message" style="width:100%;"></div>
        </v-card-title>
        <v-card-actions v-if="okButton || cancelButton">
          <v-spacer />
          <v-btn
            rounded
            :color="$theme.red"
            dark
            elevation="0"
            class="ma-2"
            v-if="okButton"
            @click="$emit('onOk')"
            >{{ okButtonText }}</v-btn
          >
          <v-btn
            rounded
            elevation="0"
            v-if="cancelButton"
            @click="$emit('onCancel')"
            >{{ cancelButtonText }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MessageDialog",
  props: {
    show: {
      default: false,
    },
    message: {
      default: "",
    },
    okButton: {
      default: true,
    },
    cancelButton: {
      default: true,
    },
    okButtonText: {
      default: "확인",
    },
    cancelButtonText: {
      default: "취소",
    },
  },
  watch: {
    async show() {
      this.visible = this.show;
    },
  },
  data: () => ({
    visible: false,
  }),
  mounted: function () {},
  methods: {},
};
</script>

<style scoped>
</style>