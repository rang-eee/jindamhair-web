<template>
<div>
    <v-card elevation="0"
        :style="'background-color:'+$theme.lightBlue">
        <v-card-title style="font-size: large">
            <v-icon
                size="20"
                v-if="listIcon.length > 0"
                color="black"
                style="margin-right: 10px">{{ listIcon }}</v-icon>{{ listTitle }}
        </v-card-title>
        <v-data-table
            :style="'cursor: pointer;background-color:'+$theme.lightBlue"
            :headers="headers"
            :items="items"
            :search="search"
            @click:row="showItem">
            <template v-slot:top>
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
                    <td>
                        <v-btn
                            style="margin-top: 10px; margin-right: 10px"
                            rounded
                            :color="$theme.primary"
                            dark
                            elevation="0"
                            @click="newItem()">
                            <v-icon dark>mdi-plus</v-icon>&nbsp;추가
                        </v-btn>
                    </td>
                </tr>
            </template>

            <template v-slot:item.createAt="{ item }">
                {{
                    $moment(item.createAt.toDate()).format("YYYY/MM/DD HH:mm:ss")
                  }}
            </template>
        </v-data-table>
    </v-card>

    <store-edit-dialog
        :show="newItemDialog"
        :item="selectedItem"
        icon="mdi-plus"
        title="추가"
        okButtonText="확인"
        cancelButtonText="취소"
        @onOk="submitItem"
        @onCancel="
        selectedItem = $models.StoreModel.create();
        newItemDialog = false;
      ">
    </store-edit-dialog>

    <store-edit-dialog
        :show="editDialog"
        :item="selectedItem"
        icon="mdi-pencil"
        title="수정"
        okButtonText="확인"
        cancelButtonText="취소"
        :deleteButton="true"
        deleteButtonText="삭제"
        @onOk="modifyItem"
        @onCancel="
        selectedItem = $models.StoreModel.create();
        editDialog = false;
      "
        @onDelete="deleteItemConfirm">
    </store-edit-dialog>

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
    name: "StoreList",
    props: {
        listIcon: {
            default: "",
        },
        listTitle: {
            default: "",
        },
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
            this.selectedItem = this.$models.StoreModel.set(item);
            this.selectedItem.id = item.id;
            this.editDialog = true;
        },
        newItem() {
            this.selectedItem = this.$models.StoreModel.create();
            this.newItemDialog = true;
        },
        async submitItem(item) {
            this.selectedItem = this.$models.StoreModel.set(item);
            this.$emit("submitItem", this.selectedItem);
            this.selectedItem = this.$models.StoreModel.create();
            this.newItemDialog = false;
        },
        async modifyItem(item) {
            this.selectedItem = this.$models.StoreModel.set(item);
            this.selectedItem.id = item.id;
            this.$emit("modifyItem", this.selectedItem);
            this.selectedItem = this.$models.StoreModel.create();
            this.editDialog = false;
        },
        async deleteItem() {
            this.$emit("deleteItem", this.selectedItem.id);
            this.deleteMessageDialog = false;
            this.editDialog = false;
        },
    },
};
</script>

<style scoped>
</style>
