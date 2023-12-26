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
                                날짜
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.reservationDay)==false)?$moment(item.reservationDay.toDate()).format("YYYY/MM/DD"):'' }}
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                시작 시간
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.startAt)==false)?$moment(item.startAt.toDate()).format("HH:mm:ss"):'' }}
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                종료 시간
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.endAt)==false)?$moment(item.endAt.toDate()).format("HH:mm:ss"):'' }}
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                예약 상태
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.reservationType=='ReservationType.userCancel'?'사용자 취소':'예약' }}
                            </v-col>
                        </v-row>

                        <div v-if="isDesigner">
                            <v-row align="start" class="item-title">
                                <v-col class="item-title">
                                    고객 이름
                                </v-col>
                            </v-row>
                            <v-row align="start" class="item-content">
                                <v-col class="item-content">
                                    {{ item.userName }}
                                </v-col>
                            </v-row>
                        </div>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                헤어 종류
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.hairCutType }}
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                헤어 이름
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.hairTitle }}
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                지점
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.storeName }}
                            </v-col>
                        </v-row>

                        <div v-if="isDesigner==false">
                            <v-row align="start" class="item-title">
                                <v-col class="item-title">
                                    디자이너 이름
                                </v-col>
                            </v-row>
                            <v-row align="start" class="item-content">
                                <v-col class="item-content">
                                    {{ item.designerName }}
                                </v-col>
                            </v-row>
                        </div>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                사진
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                <v-img
                                    v-if="$utils.isEmpty(item.imageUrl)==false"
                                    :src="item.imageUrl"
                                    width="400"
                                    contain />
                                <div v-if="$utils.isEmpty(item.imageUrl)==true">없음</div>
                            </v-col>
                        </v-row>

                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                금액
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ $utils.separateThousands(item.price+'') }}원
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
    name: "ReservationEditDialog",
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
        isDesigner: {
            default: false,
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
