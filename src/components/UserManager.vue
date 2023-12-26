<template>
<div>
    <waiting v-if="loaded==false" />
    <user-list
        v-if="loaded"
        listIcon="mdi-account-box"
        listTitle="고객 관리"
        :headers="headers"
        :items="items">
    </user-list>
</div>
</template>

<script>
export default {
    name: "UserManager",
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
        ],
        items: [],
        loaded: false,
        unsubscribeItems: null,
    }),
    mounted: async function () {
        this.loadItems();
    },
    methods: {
        async loadItems() {
            if (this.unsubscribeItems != null) {
                this.unsubscribeItems();
            }
            this.unsubscribeItems = this.$database.onUsers(async () => {
                //this.loaded = false;
                this.items = await this.$database.loadUsers();
                this.loaded = true;
            });
        },
    },
};
</script>

<style scoped>
</style>
