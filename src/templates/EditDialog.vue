<template>
  <div>
    <v-dialog v-model="visible" width="800" persistent>
      <v-card>
        <v-card-title
          ><v-icon style="margin-right: 10px">{{ icon }}</v-icon
          >{{ title }}</v-card-title
        >
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <!-- input components -->
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-right"
          ><v-spacer></v-spacer>
          <v-btn
            rounded
            :color="$theme.primary"
            dark
            elevation="0"
            @click="onOk"
            >{{ okButtonText }}</v-btn
          >
          <v-btn
            rounded
            :color="$theme.lightGrey"
            dark
            elevation="0"
            @click="$emit('onCancel')"
            >{{ cancelButtonText }}</v-btn
          >
          <v-btn
            v-if="deleteButton"
            rounded
            :color="$theme.red"
            dark
            elevation="0"
            @click="$emit('onDelete')"
            >{{ deleteButtonText }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 처리중입니다 다이얼로그 -->
    <message-dialog
      :show="workingStateDialog"
      message="처리중입니다. 잠시만 기다려주세요."
      :okButton="false"
      :cancelButton="false"
    />
  </div>
</template>

<script>
export default {
  name: "EditDialog",
  props: {
    show: {
      default: false,
    },
    icon: {
      default: "",
    },
    title: {
      default: "",
    },
    deleteButton: {
      default: false,
    },
    okButtonText: {
      default: "Confirm",
    },
    cancelButtonText: {
      default: "Cancel",
    },
    deleteButtonText: {
      default: "Delete",
    },
    item: {
      default: {},
    },
  },
  data: () => ({
    visible: false,
    items: [],
    formValid: false,
    workingStateDialog: false,
  }),
  watch: {
    async show() {
      this.visible = this.show;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      });
    },
    async item() {
    },
  },
  mounted: async function () {},
  methods: {
    onOk() {
      this.$refs.form.validate();
      if (this.formValid) {
        this.$emit("onOk", this.item);
      }
    },
  },
};
</script>

<style scoped>
</style>