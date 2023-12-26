<template>
	<div>
		<v-dialog v-model="visible" width="800" persistent>
			<v-card>
				<v-card-title>
					<v-icon style="margin-right: 10px">{{ icon }}</v-icon
					>{{ title }}
				</v-card-title>
				<v-card-text>
					<v-form ref="form" v-model="formValid">
						<v-row align="start" style="margin-top: 10px" class="pa-0 ma-0">
							<v-col cols="6" class="ma-0 pa-0">
								<v-container
									fill-height
									class="justify-center"
									:style="$utils.isEmpty(item.licenseImageUrl) == true ? 'background-color:' + $theme.lightLightGrey : ''"
								>
									<v-row class="item-title">
										<v-col class="item-title"> 자격증 사진 </v-col>
									</v-row>
									<v-row class="item-content">
										<v-col class="item-content">
											<v-img v-if="$utils.isEmpty(item.licenseImageUrl) == false" :src="item.licenseImageUrl" height="360px" contain />
											<div v-if="$utils.isEmpty(item.licenseImageUrl) == true" height="360px">없음</div>
										</v-col>
									</v-row>

									<v-row class="item-title">
										<v-col class="item-title"> 인증 </v-col>
									</v-row>
									<v-row class="item-content">
										<v-col class="item-content">
											<v-select :items="authItems" filled v-model="authStatus"></v-select>
										</v-col>
									</v-row>
								</v-container>
							</v-col>
							<v-col class="pa-0 ma-0">
								<v-container>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 생성일 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ $utils.isEmpty(item.createAt) == false ? $moment(item.createAt.toDate()).format("YYYY/MM/DD HH:mm:ss") : "" }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 이름 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.name }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 닉네임 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.nickname }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 이메일 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.email }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 연락처 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.phoneNum }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 이메일 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.email }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 근무지 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.storeName }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 근무상태 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											{{ item.isWork ? "On" : "Off" }}
										</v-col>
									</v-row>
									<v-row align="start" class="item-title">
										<v-col class="item-title"> 정산내역 </v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											<div v-if="$utils.isEmpty(item.chargeHistory) == false">
												<div v-if="item.chargeHistory.length > 0">
													<div v-for="(chargeHistory, i) in item.chargeHistory" :key="i">
														{{ chargeHistory }}
													</div>
												</div>
												<div v-if="item.chargeHistory.length == 0">없음</div>
											</div>
											<div v-if="$utils.isEmpty(item.chargeHistory) == true">없음</div>
										</v-col>
									</v-row>
									<v-row align="start" class="item-content">
										<v-col class="item-content">
											<v-text-field color="black" label="계좌번호" v-model="item.accountInfo" class="pa-0 ma-0"></v-text-field>
										</v-col>
									</v-row>
									<!--v-row>
                                    <v-col>
                                        <v-btn
                                            rounded
                                            :color="$theme.primary"
                                            dark
                                            elevation="0"
                                            @click="onClickReportButton">
                                            <v-icon style="margin-right:4px">mdi-cash-multiple</v-icon>월별 매출 내역
                                        </v-btn>
                                    </v-col>
                                </v-row-->
								</v-container>
							</v-col>
						</v-row>

						<v-container>
							<v-row align="start" class="item-title">
								<v-col class="item-title"> <v-icon style="margin-right: 10px">mdi-format-list-bulleted</v-icon>메뉴 목록 </v-col>
							</v-row>
							<v-row class="item-content">
								<v-col class="item-content">
									<menu-list :headers="headers" :items="menus"> </menu-list>
								</v-col>
							</v-row>
						</v-container>
					</v-form>
				</v-card-text>
				<v-card-actions class="d-flex justify-right">
					<v-spacer></v-spacer>
					<v-btn v-if="okButton" rounded :color="$theme.primary" dark elevation="0" @click="onOk">{{ okButtonText }}</v-btn>
					<v-btn rounded :color="$theme.lightGrey" dark elevation="0" @click="$emit('onCancel')">{{ cancelButtonText }}</v-btn>
					<v-btn v-if="deleteButton" rounded :color="$theme.red" dark elevation="0" @click="$emit('onDelete')">{{ deleteButtonText }}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- 처리중입니다 다이얼로그 -->
		<message-dialog :show="workingStateDialog" message="처리중입니다. 잠시만 기다려주세요." :okButton="false" :cancelButton="false" />

		<select-reservation-dialog :item="item" :show="selectReservationDialog" @onCancel="selectReservationDialog = false"> </select-reservation-dialog>
	</div>
</template>

<script>
export default {
	name: "DesignerEditDialog",
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
		okButton: {
			default: true,
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
		reportButton: false,
		menus: [],
		headers: [
			{
				text: "생성일",
				align: "start",
				sortable: true,
				value: "createAt",
			},
			{
				text: "이름",
				align: "start",
				sortable: true,
				value: "title",
			},
			{
				text: "헤어 성별",
				align: "start",
				sortable: true,
				value: "hairGenderType",
			},
			{
				text: "가격",
				align: "start",
				sortable: true,
				value: "price",
			},
		],
		authItems: ["대기", "승인", "반려"],
		selectReservationDialog: false,
		authStatus: "대기",
	}),
	watch: {
		async show() {
			this.visible = this.show;
			this.$nextTick(() => {
				if (this.$refs.form) {
					this.$refs.form.resetValidation();
				}
			});
			if (this.$utils.isEmpty(this.item.id) == false) {
				this.menus = await this.$database.loadMenus(this.item.id);
				if (this.item.designerAuthStatus == "DesignerAuthStatus.authComplete") {
					this.authStatus = "승인";
				} else if (this.item.designerAuthStatus == "DesignerAuthStatus.authReject") {
					this.authStatus = "반려";
				} else if (this.item.designerAuthStatus == "DesignerAuthStatus.authWait") {
					this.authStatus = "대기";
				} else {
					this.authStatus = "대기";
				}
			}
		},
		async item() {},
	},
	mounted: async function () {},
	methods: {
		onOk() {
			this.$refs.form.validate();
			if (this.formValid) {
				if (this.authStatus == "승인") {
					this.item.designerAuthStatus = "DesignerAuthStatus.authComplete";
				} else if (this.authStatus == "반려") {
					this.item.designerAuthStatus = "DesignerAuthStatus.authReject";
				} else if (this.authStatus == "대기") {
					this.item.designerAuthStatus = "DesignerAuthStatus.authWait";
				} else {
					this.item.designerAuthStatus = "DesignerAuthStatus.authWait";
				}
				this.$emit("onOk", this.item);
			}
		},
		onClickReportButton() {
			this.selectReservationDialog = true;
		},
	},
};
</script>

<style scoped>
.item-title {
	font-size: 14px;
	font-weight: bold;
	text-align: left;
	margin-top: 0px;
	margin-bottom: 0px;
	padding-top: 0px;
	padding-bottom: 0px;
}

.item-content {
	font-size: 12px;
	text-align: left;
	margin-top: 5px;
	margin-bottom: 15px;
	padding-top: 0px;
	padding-bottom: 0px;
}
</style>
