<template>
  <div>
    <div
      v-if="fileName.length > 0"
      style="text-align: left; margin-bottom: 20px"
    >
      <v-row>
        <v-col>{{ fileName }}</v-col>
        <v-col cols="1">
          <v-btn fab x-small color="black" @click="deleteFileConfirm=true">
            <v-icon color="white" size="30px">mdi-close</v-icon>
          </v-btn></v-col
        ></v-row
      >
    </div>

    <message-dialog
      :show="deleteFileConfirm"
      message="삭제하시겠습니까?"
      :okButton="true"
      cancelButtonText="취소"
      @onOk="
        $emit('onDeleteFile');
        deleteFileConfirm = false;
      "
      @onCancel="deleteFileConfirm = false"
    />
  </div>
</template>

<script>
export default {
  name: "FileNameViewer",
  props: {
    fileName: {
      default: "",
    },
  },
  data: () => ({
    deleteFileConfirm: false,
  }),
  mounted: async function () {},
  methods: {},
};
</script>

<style scoped>
</style>
