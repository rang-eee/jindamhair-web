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
                                헤어 성별
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.title }}
                            </v-col>
                            <v-col class="item-content">
                                {{ item.hairGenderType }}
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                기본 가격
                            </v-col>
                            <v-col class="item-title">
                                턱선 추가 금액
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.price)==false)?$utils.separateThousands(item.price):'0' }}원
                            </v-col>
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.chinPrice)==false)?$utils.separateThousands(item.chinPrice):'0' }}원
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                어깨선 추가 금액
                            </v-col>
                            <v-col class="item-title">
                                가슴선 추가 금액
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.shoulderPrice)==false)?$utils.separateThousands(item.shoulderPrice):'0' }}원
                            </v-col>
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.chestPrice)==false)?$utils.separateThousands(item.chestPrice):'0' }}원
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                              허리 선 추가 금액
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ ($utils.isEmpty(item.waistPrice)==false)?$utils.separateThousands(item.waistPrice):'0' }}원
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                              헤어 시간
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.hairTime }}분
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                                헤어 이미지
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                <div
                                    v-if="$utils.isEmpty(item.hairImageUrl)==false">
                                <v-img
                                    v-for="url, i in item.hairImageUrl"
                                    :key="i"
                                    :src="url"
                                    width="400"
                                    contain />
                                </div>
                                <div v-if="$utils.isEmpty(item.hairImageUrl)==true">없음</div>
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-title">
                            <v-col class="item-title">
                              Open 여부
                            </v-col>
                        </v-row>
                        <v-row align="start" class="item-content">
                            <v-col class="item-content">
                                {{ item.isOpenMenu?'O':'X' }}
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
    name: "MenuEditDialog",
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
