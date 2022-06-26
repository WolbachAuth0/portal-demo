import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    default: true,
    light: false,
    themes: {
      dark: {
        background: colors.grey.darken2,
        surface: colors.grey,
        primary: colors.blue.lighten3,
        secondary: colors.blueGrey.darken2,
        info: colors.blueGrey.lighten3,
        accent: colors.cyan.accent4,
        success: colors.green.darken1,
        warning: colors.yellow.lighten4,
        error: colors.red.lighten4,
      },
      light: {
        background: colors.grey.lighten5,
        surface: colors.grey.lighten4,
        // primary: colors.red.darken1, // #E53935
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base,
        // info: colors.blueGrey.lighten3,
        // success: colors.green.lighten1,
        // warning: colors.yellow,
        // error: colors.red.darken3,
      },
      default: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  },
});
