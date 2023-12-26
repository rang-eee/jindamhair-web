<template>
  <div>
    <v-card flat class="bg-lb">
      <v-card-title style="font-size: large">
        <v-icon size="20" color="black" style="margin-right: 10px"
          >mdi-cog</v-icon
        >기타 설정
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <h3 class="ma-2">관리자 비밀번호 변경</h3>
          </v-row>
          <v-row
            ><v-col>
              <v-form ref="form" v-model="formValid" style="width: 300px">
                <v-text-field
                  v-model="currPassword"
                  counter="10"
                  :rules="$rules.passwordRules"
                  label="현재 비밀번호"
                  required
                  type="password"
                  autocomplete="password"
                  color="black"
                  style="font-size: 12px; margin: 0px 50px 0px 50px"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  counter="10"
                  :rules="$rules.passwordRules"
                  label="비밀번호"
                  required
                  type="password"
                  autocomplete="password"
                  color="black"
                  style="font-size: 12px; margin: 0px 50px 0px 50px"
                ></v-text-field>
                <v-text-field
                  v-model="passwordConfirm"
                  counter="10"
                  :rules="$rules.passwordRules"
                  label="비밀번호 확인"
                  required
                  type="password"
                  autocomplete="password"
                  color="black"
                  style="font-size: 12px; margin: 0px 50px 0px 50px"
                ></v-text-field>
                <v-btn
                  rounded
                  :color="$theme.primary"
                  dark
                  elevation="0"
                  class="ma-6"
                  @click="updatePassword()"
                >
                  비밀번호 변경
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <!-- 알림 메시지 다이얼로그 -->
    <message-dialog
      :show="infoMessageDialog"
      :message="infoMessage"
      :okButton="false"
      cancelButtonText="닫기"
      @onCancel="infoMessageDialog = false"
    />

    <!-- 처리중입니다 다이얼로그 -->
    <message-dialog
      :show="workingStateDialog"
      message="처리중입니다. 잠시만 기다려주세요."
      :okButton="false"
      :cancelButton="false"
    />
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: {},
  data: () => ({
    currPassword: "",
    password: "",
    passwordConfirm: "",
    formValid: false,

    infoMessageDialog: false,
    infoMessage: "",
    workingStateDialog: false,
  }),
  mounted: function () {
  },
  methods: {
    async updatePassword() {
      this.$refs.form.validate();
      if (this.formValid) {
        if (this.password == this.passwordConfirm) {
          let reauth = false;
          try {
            await this.$auth.reauthenticate(this.currPassword);
            reauth = true;
          } catch (e) {
            console.log(e);
            this.infoMessage = "현재 비밀번호가 일치하지 않습니다.";
            this.infoMessageDialog = true;
          }

          if (reauth) {
            try {
              await this.$auth.updatePassword(this.password);
              this.infoMessage = "비밀번호가 변경되었습니다.";
              this.infoMessageDialog = true;
            } catch (e) {
              console.log(e);
              this.infoMessage =
                "비밀번호 변경에 실패하였습니다. 다시 로그인 후 이용해주세요.";
              this.infoMessageDialog = true;
            }
          }
        } else {
          this.infoMessage = "새 비밀번호가 일치하지 않습니다.";
          this.infoMessageDialog = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.bg-lb {
    background-color: #F2F5FF;
}
</style>