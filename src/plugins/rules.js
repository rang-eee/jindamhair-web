import Vue from "vue";

export default {
};

export const rules = {
  install(Vue) {
    Vue.prototype.$rules = {
      idRules: [(v) => !!v || "ID를 입력해주세요.",
      (v) => /^[a-zA-Z0-9]*$/.test(v) || "영문자 및 숫자로만 입력해주세요."],
      passwordRules: [(v) => v.length >= 6 || "최소 길이는 6입니다."],
      numbersRules: [(v) => /^[0-9]*$/.test(v) || "숫자로만 입력해주세요."],
      floatingNumbersRules: [(v) => /^[0-9]+(.[0-9]+)?$/.test(v) || "잘못된 입력입니다."],
      inputRules: [(v) => !!v || "입력해주세요."],
      hourRules: [(v) => !!v || "",
      (v) => /^[0-9]*$/.test(v) || "",
      (v) => ((v * 1 >= 0) && (v * 1 <= 23)) || ""],
      minuteRules: [(v) => !!v || "",
      (v) => /^[0-9]*$/.test(v) || "",
      (v) => ((v * 1 >= 0) && (v * 1 <= 59)) || ""],
      secondRules: [(v) => !!v || "",
      (v) => /^[0-9]*$/.test(v) || "",
      (v) => ((v * 1 >= 0) && (v * 1 <= 59)) || ""],
    }
  }
};

Vue.use(rules);