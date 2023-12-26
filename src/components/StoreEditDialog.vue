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
                    <v-text-field
                        color="black"
                        label="이름"
                        v-model="item.title"
                        :rules="$rules.inputRules"></v-text-field>
                    <div class="d-flex justify-start align-center">
                        <v-text-field
                            color="black"
                            label="주소"
                            v-model="item.address"
                            :rules="$rules.inputRules"></v-text-field>
                        <div class="text-sm ms-2" v-if="($utils.isEmpty(item.postCode)==false) && (item.postCode.length > 0)">[우편번호 : {{item.postCode}}]</div>
                        <v-btn
                            rounded
                            :color="$theme.primary"
                            dark
                            elevation="0"
                            @click="searchPostCodeDialog=true"
                            class="ms-2 mb-1">우편번호 검색</v-btn>
                    </div>
                    <v-text-field
                        color="black"
                        label="매장 전화번호"
                        v-model="item.phoneNum"
                        :rules="$rules.inputRules"></v-text-field>
                    <v-text-field
                        color="black"
                        label="설명"
                        v-model="item.description"
                        :rules="$rules.inputRules"></v-text-field>
                    <v-text-field
                        color="black"
                        label="GPS X"
                        v-model="item.gpsX"
                        placeholder="우편번호를 검색해주세요."></v-text-field>
                    <v-text-field
                        color="black"
                        label="GPS Y"
                        v-model="item.gpsY"
                        placeholder="우편번호를 검색해주세요."></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-right">
                <v-spacer></v-spacer>
                <v-btn
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

    <v-dialog v-model="searchPostCodeDialog" max-width="600">
        <template>
            <VueDaumPostcode @complete="onComplete" />
        </template>
    </v-dialog>
</div>
</template>

<script>
import {
    VueDaumPostcode
} from "vue-daum-postcode";
export default {
    name: "StoreEditDialog",
    components: {
        VueDaumPostcode
    },
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
        formValid: false,
        workingStateDialog: false,
        searchPostCodeDialog: false,
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
    mounted: async function () {
        if (!window.kakao || !window.kakao.maps) {
            let kakaoScript = document.createElement('script');
            kakaoScript.onload = () => window.kakao.maps.load(this.initMap);
            kakaoScript.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=efc1e0b49434d89db4eec451305df348&libraries=services';
            document.head.appendChild(kakaoScript);
        }
    },
    methods: {
        onOk() {
            this.$refs.form.validate();
            if (this.formValid) {
                if(this.$utils.isEmpty(this.item.gpsX)==false) {
                    this.item.gpsX = this.item.gpsX*1;
                    if(isNaN(this.item.gpsX)) {
                        this.item.gpsX = null;
                    }
                }
                if(this.$utils.isEmpty(this.item.gpsX)==false) {
                    this.item.gpsY = this.item.gpsY*1;
                    if(isNaN(this.item.gpsY)) {
                        this.item.gpsY = null;
                    }
                }
                this.$emit("onOk", this.item);
            }
        },
        async onComplete(result) {
            this.workingStateDialog = true;
            console.log(result);
            this.item.address = result.roadAddress;
            this.item.postCode = result.zonecode;
            await this.getGps(this.item.address);
            this.searchPostCodeDialog = false;
            this.workingStateDialog = false;
        },
        async getGps(address) {
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            let onGetGps = this.onGetGps;
            geocoder.addressSearch(address, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {
                    let coords = {
                        x: result[0].y,
                        y: result[0].x
                    };
                    onGetGps(coords);
                }
            });
        },
        onGetGps(coords) {
            this.item.gpsX = coords.x * 1;
            this.item.gpsY = coords.y * 1;
            console.log('onGetGps', this.item.gpsX, this.item.gpsY);
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
    font-weight: normal;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 15px;
    padding-top: 0px;
    padding-bottom: 0px;
}
</style>
