<template>
<div>
    <v-card elevation="0">
        <v-data-table
            style="cursor: pointer"
            :headers="headers"
            :items="items"
            :search="search"
            @click:row="showItem">
            <!--template v-slot:top>
                <tr class="d-flex justify-space-between">
                    <td style="width: 200px; margin-right: 20px">
                        <v-text-field
                            color="black"
                            v-model="search"
                            label="검색"
                            class="mx-4"
                            append-icon="mdi-magnify"
                            style="width: 300px"></v-text-field>
                    </td>
                </tr>
            </template-->

            <template v-slot:item.reservationDay="props">
                {{
            $moment(props.item.reservationDay.toDate()).format("YYYY/MM/DD")
          }}
            </template>

            <template v-slot:item.price="props">
                {{
            $utils.separateThousands(props.item.price)
          }}원
            </template>

            <template v-slot:item.title="props">
                <div style="width:270px">{{
            props.item.title
          }}
                </div>
            </template>
        </v-data-table>
    </v-card>

    <reservation-edit-dialog
      :show="editDialog"
      :item="selectedItem"
      icon="mdi-clipboard"
      title="상세정보"
      okButtonText="확인"
      :okButton="false"
      cancelButtonText="닫기"
      :deleteButton="false"
      deleteButtonText="삭제"
      @onOk="modifyItem"
      @onCancel="
        selectedItem = $models.ReservationModel.create();
        editDialog = false;
      "
      @onDelete="deleteItemConfirm"
      :isDesigner="true"
    >
    </reservation-edit-dialog>

    <message-dialog
        :show="deleteMessageDialog"
        message="삭제하시겠습니까?"
        :okButton="true"
        cancelButtonText="취소"
        :deleteButton="true"
        deleteButtonText="삭제"
        @onOk="deleteItem"
        @onCancel="deleteMessageDialog = false" />
</div>
</template>

<script>
export default {
    name: "SelectReservationList",
    props: {
        items: {
            default: [],
        },
        headers: {
            default: [],
        },
    },
    data: () => ({
        search: "",
        selectedItem: {},
        deleteMessageDialog: false,
        formValid: false,
        newItemDialog: false,
        editDialog: false,
    }),
    mounted: function () {},
    methods: {
        deleteItemConfirm() {
            this.deleteMessageDialog = true;
        },
        showItem(item) {
            this.selectedItem = this.$models.ReservationModel.set(item);
            this.selectedItem.id = item.id;
            this.editDialog = true;
        },
        newItem() {
            this.selectedItem = this.$models.ReservationModel.create();
            this.newItemDialog = true;
        },
        async submitItem(item) {
            this.selectedItem = this.$models.ReservationModel.set(item);
            this.$emit("submitItem", this.selectedItem);
            this.selectedItem = this.$models.ReservationModel.create();
            this.newItemDialog = false;
        },
        async modifyItem(item) {
            this.selectedItem = this.$models.ReservationModel.set(item);
            this.selectedItem.id = item.id;
            this.$emit("modifyItem", this.selectedItem);
            this.selectedItem = this.$models.ReservationModel.create();
            this.editDialog = false;
        },
        async deleteItem() {
            this.$emit("deleteItem", this.selectedItem.id);
            this.deleteMessageDialog = false;
            this.editDialog = false;
        },
        async onSelect(item) {
            this.selectedItem = this.$models.ReservationModel.set(item);
            this.selectedItem.id = item.id;
            this.$emit("selectItem", this.selectedItem);
            this.selectedItem = this.$models.ReservationModel.create();
        },
    },
};
</script>

<style scoped>
</style>
