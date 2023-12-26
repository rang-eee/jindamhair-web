<template>
<div>
    <v-dialog
        v-model="visible"
        width="800"
        persistent>
        <v-card v-if="loaded==false">
            <waiting />
        </v-card>
        <v-card v-if="loaded">
            <v-card-title style="font-size: large">
                <v-icon
                    size="20"
                    color="black"
                    style="margin-right: 10px">mdi-cash-multiple</v-icon>월별 매출 내역
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row v-if="currentMonth != null">
                        <v-col class="item-title">
                            <v-container>
                                <v-row align="center">
                                    <v-col align="end">
                                        <v-icon @click="onClickLeft">mdi-chevron-left</v-icon>
                                    </v-col>
                                    <v-col align="center" cols="2" :key="monthKey">
                                        {{ $moment(currentMonth).format("YYYY년 MM월") }}
                                    </v-col>
                                    <v-col align="start">
                                        <v-icon @click="onClickRight">mdi-chevron-right</v-icon>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <select-reservation-list
                                :headers="headers"
                                :items="items"
                                @submitItem="submitItem"
                                @modifyItem="modifyItem"
                                @deleteItem="deleteItem"
                                @selectItem="selectItem">
                            </select-reservation-list>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="item-title">
                            월별 매출 합계
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col align="start" class="item-content">
                            {{$utils.separateThousands(sum+'')}}원
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions class="d-flex justify-right">
                <v-spacer></v-spacer>
                <v-btn
                    rounded
                    :color="$theme.lightGrey"
                    dark
                    elevation="0"
                    @click="$emit('onCancel')">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "SelectReservationDialog",
    props: {
        show: {
            default: false,
        },
        item: {
            default: {},
        },
    },
    watch: {
        async show() {
            this.visible = this.show;
            if (this.visible == true) {
                this.currentMonth = new Date(Date.now());
                this.currentMonth.setDate(1);
                this.currentMonth.setHours(0,0,0,0);
                if (this.$utils.isEmpty(this.item.id) == false) {
                    await this.loadItems();
                }
            }
        },
    },
    data: () => ({
        headers: [{
                text: "날짜",
                align: "start",
                sortable: true,
                value: "reservationDay",
            },
            {
                text: "고객 이름",
                align: "start",
                sortable: true,
                value: "userName",
            },
            {
                text: "헤어 시술",
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
        items: [],
        visible: false,
        loaded: false,
        sum: 0,
        currentMonth: null,
        monthKey: 0,
    }),
    mounted: async function () {
    },
    methods: {
        async loadItems() {
            this.loaded = false;
            let startDate = new Date(this.currentMonth);
            let endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth()+1, 1);
            endDate.setDate(endDate.getDate()-1);
            let items = await this.$database.loadReservationsOfDesigner(
                this.item.id, 
                this.$database.dateToTimestamp(startDate), 
                this.$database.dateToTimestamp(endDate));
            this.sum = 0;
            let sum = 0;
            for (let i = 0; i < items.length; i++) {
                sum += (items[i].price) * 1;
            }
            this.items = items;
            this.sum = sum;
            this.loaded = true;
        },
        async submitItem(item) {
            await this.$database.addReservation(item);
            await this.loadItems();
        },
        async modifyItem(item) {
            await this.$database.editReservation(item.id, item);
            await this.loadItems();
        },
        async deleteItem(id) {
            await this.$database.deleteReservation(id);
            await this.loadItems();
        },
        async selectItem(item) {
            this.$emit('onSelect', item);
        },
        onClickLeft() {
            if (this.$utils.isEmpty(this.currentMonth) == false) {
                this.currentMonth = new Date(this.$utils.prevMonth(this.currentMonth));
                this.monthKey = this.currentMonth.getMonth();
                this.loadItems();
            }
        },
        onClickRight() {
            if (this.$utils.isEmpty(this.currentMonth) == false) {
                this.currentMonth = new Date(this.$utils.nextMonth(this.currentMonth));
                this.monthKey = this.currentMonth.getMonth();
                this.loadItems();
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
