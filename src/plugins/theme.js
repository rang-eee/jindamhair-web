import Vue from "vue";
import colors from 'vuetify/lib/util/colors'

let themeColors = {
  primary: '#1E3986',
  secondary: '#495057',
  accent: colors.red.darken3,

  lightGrey: '#AAAAAA',
  lightLightGrey: '#F0F0F0',
  darkGrey: '#495057',
  red: colors.red.darken3,
  lightBlue: '#F2F5FF',
};

export default themeColors;

export const theme = {
  install(Vue) {
    Vue.prototype.$theme = themeColors;
  }
};

Vue.use(theme);
