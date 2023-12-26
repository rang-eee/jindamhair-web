<template>
	<div>
		<div style="margin-bottom: 20px">
			<v-hover v-slot="{ hover }">
				<v-img :src="imageUrl" width="100%">
					<v-container class="text-right">
						<v-btn v-if="hover" fab x-small color="black" @click="deleteImageConfirm = true">
							<v-icon color="white" size="30px">mdi-close</v-icon>
						</v-btn>
					</v-container>
				</v-img>
			</v-hover>
		</div>

		<message-dialog
			:show="deleteImageConfirm"
			message="삭제하시겠습니까?"
			:okButton="true"
			cancelButtonText="취소"
			@onOk="
				$emit('onDeleteImage');
				deleteImageConfirm = false;
			"
			@onCancel="deleteImageConfirm = false"
		/>
	</div>
</template>

<script>
export default {
	name: "ImageViewer",
	props: {
		imageUrl: {
			default: "",
		},
	},
	data: () => ({
		deleteImageConfirm: false,
	}),
	mounted: async function () {},
	methods: {},
};
</script>

<style scoped></style>
