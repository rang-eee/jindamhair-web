<template>
<div>
    <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="items"
        @click:row="showItem">
        <template v-slot:item.createAt="props">
            {{
            $moment(props.item.createAt.toDate()).format("YYYY/MM/DD HH:mm:ss")
          }}
        </template>
        <template v-slot:item.price="props">
            {{
            $utils.separateThousands(props.item.price)
          }}원
        </template>
    </v-data-table>

    <menu-edit-dialog
        :show="editDialog"
        :item="selectedItem"
        icon="mdi-format-list-bulleted"
        title="메뉴 상세정보"
        okButtonText="확인"
        :okButton="false"
        cancelButtonText="닫기"
        :deleteButton="false"
        deleteButtonText="삭제"
        @onCancel="
        selectedItem = $models.MenuModel.create();
        editDialog = false;
      ">
    </menu-edit-dialog>

</div>
</template>

<script>
export default {
    name: "MenuList",
    props: {
        items: {
            default: [],
        },
        headers: {
            default: [],
        },
    },
    data: () => ({
        selectedItem: {},
        formValid: false,
        editDialog: false,
    }),
    mounted: function () {},
    methods: {
        showItem(item) {
            this.selectedItem = this.$models.MenuModel.set(item);
            this.selectedItem.id = item.id;
            this.editDialog = true;
        },
    },
};
</script>

<style scoped>
</style>
