<template>
	<div class="tab-container">
		<div class="tabs">
			<div :class="{ tab: true, active: currentTab === 'privacy' }" @click="currentTab = 'privacy'">개인정보처리방침</div>
			<div :class="{ tab: true, active: currentTab === 'terms' }" @click="currentTab = 'terms'">이용약관</div>
			<div :class="{ tab: true, active: currentTab === 'ecommerce' }" @click="currentTab = 'ecommerce'">전자상거래 표준약관</div>
		</div>

		<div class="tab-content" v-if="currentTab === 'privacy'">
			<privacy-policy></privacy-policy>
		</div>
		<div class="tab-content" v-if="currentTab === 'terms'">
			<term-service></term-service>
		</div>
		<div class="tab-content" v-if="currentTab === 'ecommerce'">
			<electronic-commerce></electronic-commerce>
		</div>
	</div>
</template>

<script>
export default {
	name: "PrivacyDocument",
	data() {
		return {
			currentTab: "privacy", // 기본 탭
		};
	},
	created() {
		// URL 파라미터에 따라 탭을 설정
		const param = this.$route.params.param;
		if (param && ["privacy", "terms", "ecommerce"].includes(param)) {
			this.currentTab = param;
		}
	},
};
</script>

<style scoped>
.tab-container {
	margin: 20px;
}

.tabs {
	display: flex;
	margin-bottom: 20px;
}

.tab {
	padding: 10px 20px;
	border: 1px solid #ddd;
	cursor: pointer;
}

.tab.active {
	background-color: #f9f9f9;
}

.tab-content {
	padding: 20px;
	text-align: left;
}

.tab-content h2 {
	margin-top: 0;
}
</style>
