<template>
	<div>
		<v-card elevation="0" :style="'background-color:' + $theme.lightBlue">
			<v-card-title style="font-size: large">
				<v-icon size="20" v-if="listIcon.length > 0" color="black" style="margin-right: 10px">{{ listIcon }}</v-icon
				>{{ listTitle }}
			</v-card-title>
			<v-data-table
				:style="'cursor: pointer;background-color:' + $theme.lightBlue"
				:headers="headers"
				:items="items"
				:search="search"
				@click:row="showItem"
			>
				<template v-slot:top>
					<tr class="d-flex justify-space-between">
						<td style="width: 200px; margin-right: 20px">
							<v-text-field
								color="black"
								v-model="search"
								label="검색"
								class="mx-4"
								append-icon="mdi-magnify"
								style="width: 300px"
							></v-text-field>
						</td>
					</tr>
				</template>

				<template v-slot:item.createAt="props">
					{{ $moment(props.item.createAt.toDate()).format("YYYY/MM/DD HH:mm:ss") }}
				</template>
				<template v-slot:item.designerAuthStatus="props">
					<v-chip :color="getColor(props.item.designerAuthStatus)" dark>
						{{ getAuthStatus(props.item.designerAuthStatus) }}
					</v-chip>
				</template>
				<template v-slot:item.isWork="props">
					{{ props.item.isWork ? "On" : "Off" }}
				</template>
			</v-data-table>
		</v-card>

		<designer-edit-dialog
			:show="editDialog"
			:item="selectedItem"
			icon="mdi-badge-account"
			title="디자이너 상세정보"
			okButtonText="저장"
			:okButton="true"
			cancelButtonText="닫기"
			:deleteButton="false"
			deleteButtonText="삭제"
			@onOk="modifyItem"
			@onCancel="
				selectedItem = $models.UserModel.create();
				editDialog = false;
			"
			@onDelete="deleteItemConfirm"
		>
		</designer-edit-dialog>

		<message-dialog
			:show="deleteMessageDialog"
			message="삭제하시겠습니까?"
			:okButton="true"
			cancelButtonText="취소"
			:deleteButton="true"
			deleteButtonText="삭제"
			@onOk="deleteItem"
			@onCancel="deleteMessageDialog = false"
		/>
	</div>
</template>

<script>
export default {
	name: "DesignerList",
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
			this.selectedItem = this.$models.UserModel.set(item);
			this.selectedItem.id = item.id;
			this.editDialog = true;
		},
		newItem() {
			this.selectedItem = this.$models.UserModel.create();
			this.newItemDialog = true;
		},
		async submitItem(item) {
			this.selectedItem = this.$models.UserModel.set(item);
			this.$emit("submitItem", this.selectedItem);
			this.selectedItem = this.$models.UserModel.create();
			this.newItemDialog = false;
		},
		async modifyItem(item) {
			this.selectedItem = this.$models.UserModel.set(item);
			this.selectedItem.id = item.id;
			this.$emit("modifyItem", this.selectedItem);
			this.selectedItem = this.$models.UserModel.create();
			this.editDialog = false;
		},
		async deleteItem() {
			this.$emit("deleteItem", this.selectedItem.id);
			this.deleteMessageDialog = false;
			this.editDialog = false;
		},
		getColor(status) {
			if (status == "DesignerAuthStatus.authComplete") {
				return this.$theme.primary;
			} else if (status == "DesignerAuthStatus.authReject") {
				return this.$theme.red;
			} else if (status == "DesignerAuthStatus.authWait") {
				return this.$theme.lightGrey;
			} else {
				return this.$theme.lightGrey;
			}
		},
		getAuthStatus(status) {
			if (status == "DesignerAuthStatus.authComplete") {
				return "승인";
			} else if (status == "DesignerAuthStatus.authReject") {
				return "반려";
			} else if (status == "DesignerAuthStatus.authWait") {
				return "대기";
			} else {
				return "대기";
			}
		},
	},
};
</script>

<style scoped></style>
