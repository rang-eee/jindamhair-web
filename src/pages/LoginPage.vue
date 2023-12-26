<template>
	<div>
		<v-container fluid :style="'height: 100vh;background-color:' + $theme.primary">
			<v-layout fill-height>
				<v-row align="center">
					<v-col align="center">
						<v-sheet class="mx-auto" style="width: 400px; padding: 50px" outlined rounded="xl">
							<v-form ref="form" v-model="formValid">
								<h3 :style="'text-color:' + $theme.primary">진담헤어 관리자 웹!</h3>
								<v-row align="center" style="margin-top: 40px"
									><v-col>
										<v-text-field
											v-model="uid"
											counter="30"
											:rules="$rules.idRules"
											label="ID"
											required
											autocomplete="id"
											color="black"
											style="font-size: 12px; margin: 0px 50px 0px 50px"
										></v-text-field></v-col
								></v-row>
								<v-row align="center"
									><v-col
										><v-text-field
											v-model="password"
											counter="10"
											:rules="$rules.passwordRules"
											label="Password"
											required
											type="password"
											autocomplete="password"
											color="black"
											style="font-size: 12px; margin: 0px 50px 0px 50px"
											@keyup.enter="clickedLogin()"
										></v-text-field></v-col
								></v-row>
								<v-row align="center" style="margin-top: 50px; margin-bottom: 20px"
									><v-col>
										<v-btn rounded :color="$theme.primary" dark elevation="0" @click="clickedLogin()">
											<v-icon dark>mdi-login</v-icon>&nbsp;로그인
										</v-btn>
									</v-col></v-row
								>
							</v-form>
						</v-sheet>
					</v-col>
				</v-row>
			</v-layout>
		</v-container>
		<v-bottom-sheet v-model="sheet">
			<v-sheet class="text-center" height="200px">
				<v-btn class="mt-6" text color="red" @click="sheet = !sheet"> 닫기 </v-btn>
				<div class="py-3">
					{{ bottomSheetMessage }}
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</div>
</template>

<script>
export default {
	name: "LoginPage",
	data: () => ({
		uid: "",
		password: "",
		alignments: ["start", "center", "end"],
		sheet: false,
		bottomSheetMessage: "로그인 권한이 없습니다.",
		formValid: false,
	}),
	methods: {
		async clickedLogin() {
			this.$refs.form.validate();
			if (this.formValid) {
				await this.$auth.logout();
				try {
					await this.$auth.login(this.uid + "@jindamhair.app", this.password);
					this.$router.push("/");
				} catch (e) {
					console.log(e);
					// 로그인 실패 팝업
					this.bottomSheetMessage = "로그인에 실패하였습니다.";
					this.sheet = true;
				}
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
