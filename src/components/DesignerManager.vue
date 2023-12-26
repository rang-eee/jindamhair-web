<template>
<div>
    <waiting v-if="loaded==false" />
    <designer-list
        v-if="loaded"
        listIcon="mdi-badge-account"
        listTitle="디자이너 관리"
        :headers="headers"
        :items="items"
        @modifyItem="modifyItem">
    </designer-list>
</div>
</template>

<script>
export default {
    name: "DesignerManager",
    props: {},
    data: () => ({
        headers: [{
                text: "이름",
                align: "start",
                sortable: true,
                value: "name",
            },
            {
                text: "생성일",
                align: "start",
                sortable: true,
                value: "createAt",
            },
            {
                text: "이메일",
                align: "start",
                sortable: true,
                value: "email",
            },
            {
                text: "닉네임",
                align: "start",
                sortable: true,
                value: "nickname",
            },
            {
                text: "근무지",
                align: "start",
                sortable: true,
                value: "storeName",
            },
            {
                text: "근무상태",
                align: "start",
                sortable: true,
                value: "isWork",
            },
            {
                text: "인증상태",
                align: "start",
                sortable: true,
                value: "designerAuthStatus",
            },
        ],
        items: [],
        loaded: false,
    }),
    mounted: async function () {
        this.loadItems();
    },
    methods: {
        async loadItems() {
            if (this.unsubscribeItems != null) {
                this.unsubscribeItems();
            }
            this.unsubscribeItems = this.$database.onDesigners(async () => {
                //this.loaded = false;
                this.items = await this.$database.loadDesigners();
                this.loaded = true;
            });
        },
        async modifyItem(item) {
            let user = await this.$database.loadUser(item.id);

            let sendNotification = false;
            if (user.designerAuthStatus != item.designerAuthStatus) {
                if (item.designerAuthStatus != 'DesignerAuthStatus.authWait') {
                    sendNotification = true;
                }
            }

            user.accountInfo = item.accountInfo;
            user.designerAuthStatus = item.designerAuthStatus;
            await this.$database.setUser(item.id, user);

            if(sendNotification) {
                let notification = this.$models.NotificationModel.create();
                notification.createAt = this.$database.currentTimestamp();
                if(item.designerAuthStatus == 'DesignerAuthStatus.authComplete') {
                    notification.message = '디자이너 인증이 승인되었습니다.';
                }
                else if(item.designerAuthStatus == 'DesignerAuthStatus.authReject') {
                    notification.message = '디자이너 인증이 반려되었습니다.';
                }
                notification.receiverUid = item.id;
                notification.title = '진담헤어';
                await this.$database.addNotification(notification);
            }
        },
    },
};
</script>

<style scoped>
</style>
