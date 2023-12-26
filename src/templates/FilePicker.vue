<template>
  <div>
      <v-card elevation="0">
        <v-card-text class="text-left">
        <input
          ref="inputFile"
          type="file"
          @change="handleFileChange"
          class="text-left"
          style="background-color: rgba(0, 0, 0, 0.1)"
        />
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "FilePicker",
  props: {
  },
  data: () => ({
    selectedFile: null,
  }),
  mounted: function () {},
  methods: {
    handleFileChange(result) {
      this.selectedFile = result.target.files[0];
      this.$emit('onClickSave', this.selectedFile);
    },
  },
};
</script>

<style scoped>
</style>