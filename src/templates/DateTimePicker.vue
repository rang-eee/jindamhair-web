<template>
<div>
    <v-container>
        <v-row>
            <v-col v-if="showDate">
                <v-menu
                    ref="menuDate"
                    v-model="menuDate"
                    :close-on-content-click="false"
                    :return-value.sync="dateText"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateText"
                            label="날짜"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateText" no-title>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menuDate = false">
                            취소
                        </v-btn>
                        <v-btn
                            text
                            color="accent"
                            @click="$refs.menuDate.save(dateText);updateDateValue();">
                            확인
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col v-if="showTime">
                <v-menu
                    ref="menuTime"
                    v-model="menuTime"
                    :close-on-content-click="false"
                    :return-value.sync="timeText"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="timeText"
                            label="시간"
                            prepend-icon="mdi-clock"
                            readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-model="timeText">
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menuTime = false">
                            취소
                        </v-btn>
                        <v-btn
                            text
                            color="accent"
                            @click="$refs.menuTime.save(timeText);updateDateValue();">
                            확인
                        </v-btn>
                    </v-time-picker>
                </v-menu>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    name: "DateTimePicker",
    props: {
        date: {
            default: "",
        },
        time: {
            default: "",
        },
        showDate: {
            default: true,
        },
        showTime: {
            default: true,
        },
    },
    data: () => ({
        menuDate: false,
        menuTime: false,
        dateText: "",
        timeText: "",
    }),
    mounted() {
        this.dateText = this.date;
        this.timeText = this.time;
    },
    watch: {
        async date() {
            this.dateText = this.date;
            this.timeText = this.time;
        },
    },
    methods: {
        updateDateValue() {
            let dateTime = Date.parse(this.dateText + " " + this.timeText);
            this.$emit("onEdit", dateTime);
        },
    },
};
</script>

<style scoped>
</style>
