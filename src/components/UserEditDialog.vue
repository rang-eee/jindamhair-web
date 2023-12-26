<template>
<div>
    <v-dialog
        v-model="visible"
        width="800"
        persistent>
        <v-card>
            <v-card-title>
                <v-icon style="margin-right: 10px">{{ icon }}</v-icon>{{ title }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="formValid">
                    <v-container>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                생성일
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.createAt)==false)?$moment(item.createAt.toDate()).format("YYYY/MM/DD HH:mm:ss"):'' }}
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                이름
                            </v-col>
                            <v-col class="item-title">
                                닉네임
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.name }}
                            </v-col>
                            <v-col class="item-content">
                                {{ item.nickname }}
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                이메일
                            </v-col>
                            <v-col class="item-title">
                                연락처
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.email }}
                            </v-col>
                            <v-col class="item-content">
                                {{ item.phoneNum }}
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                사진
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col align="start" class="item-content">
                                <v-img
                                    v-if="$utils.isEmpty(item.imageUrl)==false"
                                    :src="item.imageUrl"
                                    width="300"
                                    contain />
                                <div v-if="$utils.isEmpty(item.imageUrl)==true" height="360px">없음</div>
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                이용내역
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                <v-data-table
                                    :headers="headers"
                                    :items="reservations"
                                    style="cursor: pointer"
                                    @click:row="showItem">
                                    <template v-slot:item.reservationDay="{ item }">
                                        {{
                                            $moment(item.reservationDay.toDate()).format("YYYY/MM/DD")
                                          }}
                                    </template>
                                    <template v-slot:item.startAt="{ item }">
                                        {{
                                            $moment(item.startAt.toDate()).format("HH:mm")
                                          }}
                                    </template>
                                    <template v-slot:item.endAt="{ item }">
                                        {{
                                            $moment(item.endAt.toDate()).format("HH:mm")
                                          }}
                                    </template>
                                    <template v-slot:item.price="{ item }">
                                        {{
                                            $utils.separateThousands(item.price)
                                          }}원
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-right">
                <v-spacer></v-spacer>
                <v-btn
                    v-if="okButton"
                    rounded
                    :color="$theme.primary"
                    dark
                    elevation="0"
                    @click="onOk">{{ okButtonText }}</v-btn>
                <v-btn
                    rounded
                    :color="$theme.lightGrey"
                    dark
                    elevation="0"
                    @click="$emit('onCancel')">{{ cancelButtonText }}</v-btn>
                <v-btn
                    v-if="deleteButton"
                    rounded
                    :color="$theme.red"
                    dark
                    elevation="0"
                    @click="$emit('onDelete')">{{ deleteButtonText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <reservation-edit-dialog
        :show="editDialog"
        :item="selectedItem"
        icon="mdi-clipboard"
        title="예약 상세정보"
        okButtonText="확인"
        :okButton="false"
        cancelButtonText="닫기"
        :deleteButton="false"
        deleteButtonText="삭제"
        @onCancel="
        selectedItem = $models.ReservationModel.create();
        editDialog = false;
      "
        :isDesigner="false">
    </reservation-edit-dialog>

    <!-- 처리중입니다 다이얼로그 -->
    <message-dialog
        :show="workingStateDialog"
        message="처리중입니다. 잠시만 기다려주세요."
        :okButton="false"
        :cancelButton="false" />
</div>
</template>

<script>
export default {
    name: "UserEditDialog",
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
        reservations: [],
        formValid: false,
        workingStateDialog: false,
        headers: [{
                text: "예약일",
                align: "start",
                sortable: true,
                value: "reservationDay",
            },{
                text: "시작시간",
                align: "start",
                sortable: true,
                value: "startAt",
            },{
                text: "종료시간",
                align: "start",
                sortable: true,
                value: "endAt",
            },
            {
                text: "지점",
                align: "start",
                sortable: true,
                value: "storeName",
            },
            {
                text: "항목",
                align: "start",
                sortable: true,
                value: "hairTitle",
            },
            {
                text: "금액",
                align: "start",
                sortable: true,
                value: "price",
            },
        ],
        editDialog: false,
        selectedItem: {},
    }),
    watch: {
        async show() {
            this.visible = this.show;
            this.$nextTick(() => {
                if (this.$refs.form) {
                    this.$refs.form.resetValidation();
                }
            });
            if (this.$utils.isEmpty(this.item) == false) {
                this.reservations = await this.$database.loadReservationsOfUser(this.item.id);
            }
        },
        async item() {},
    },
    mounted: async function () {},
    methods: {
        onOk() {
            this.$refs.form.validate();
            if (this.formValid) {
                this.$emit("onOk", this.item);
            }
        },
        showItem(item) {
            this.selectedItem = this.$models.ReservationModel.set(item);
            this.selectedItem.id = item.id;
            this.editDialog = true;
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
