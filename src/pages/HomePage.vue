<template>
	<div>
		<v-app>
			<v-navigation-drawer app v-model="drawer" permanent>
				<v-list nav rounded style="text-align: left">
					<list-item
						v-for="(item, i) in menuItems"
						:key="i"
						:name="item.name"
						:icon="item.icon"
						:selectedMenu="selectedMenu"
						:index="i"
						@onClickList="selectedMenu = i"
						:style="selectedMenu == i ? 'background-color:' + $theme.primary : ''"
					></list-item>
				</v-list>
				<template v-slot:append>
					<v-btn block @click="logout()" :style="'background-color:#FFFFFF;color:' + $theme.primary" elevation="0"
						><v-icon>mdi-logout</v-icon>&nbsp;로그아웃</v-btn
					>
				</template>
			</v-navigation-drawer>
			<v-main :style="'background-color:' + $theme.lightBlue">
				<v-container fluid class="pa-3">
					<user-manager v-if="selectedMenu == 0"></user-manager>
					<designer-manager v-if="selectedMenu == 1"></designer-manager>
					<store-manager v-if="selectedMenu == 2"></store-manager>
					<settings v-if="selectedMenu == 3"></settings>
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>

<script>
export default {
	name: "HomePage",
	data: () => ({
		// navigation drawer
		drawer: false,
		selectedMenu: 0,
		menuItems: [
			{
				name: "고객 관리",
				icon: "mdi-account-box",
			},
			{
				name: "디자이너 관리",
				icon: "mdi-badge-account",
			},
			{
				name: "헤어샵 관리",
				icon: "mdi-office-building",
			},
			{
				name: "기타 설정",
				icon: "mdi-cog",
			},
		],
	}),
	mounted: function () {},
	methods: {
		async logout() {
			await this.$auth.logout();
			this.$router.push("/");
		},
	},
};
</script>

<style scoped></style>
