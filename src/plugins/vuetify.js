import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import theme from './theme';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: theme.primary,
          secondary: theme.secondary,
          accent: theme.accent,
        },
      },
    },
  })
