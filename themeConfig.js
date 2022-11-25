// Locale
// import { en } from '../../locale'
import colors from "vuetify/lib/util/colors";
export const themeConfig = {
  disableCustomizer: true, // options[Boolean] : true, false(default)

  rtl: false, // options[Boolean] : true, false(default)
  verticalSidebarMini: false, // options[Boolean] : true, false(default)
  verticalSidebarDrawer: false, // options[Boolean] : true, false(default)
  verticalCompactSidebarDrawer: false, // options[Boolean] : true, false(default)
  verticalSaasSidebarDrawer: false, // options[Boolean] : true, false(default)
  showBreadcrumb: true, // options[Boolean] : true, false(default)

  layout: "HorizontalBar", //VerticalWhiteSidebar,VerticalCompactSidebar,VerticalSaasLayout,VerticalSidebar,HorizontalBar
  isLoading: false,

  isDark: false,
  verticalSidebarDrawerColor: "primary", // primary,white,sucsess,warning,etc
  appBarColor: "white" // primary,white,sucsess,warning,etc
};

// export const vuetify = new Vuetify({
//   theme: { dark: mq.matches }
// });

// mq.addEventListener("change", e => {
//   this.$vuetify.theme.dark = e.matches;
// });

export const themePreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },

  rtl: false,

  theme: {
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: "#00416D",
        secondary: "#6AA5CB",
        success: "#A0D5F8",
        danger: "#A71E26",
        warning: "#E6A520",
        info: "#00416D",
        dark: "#575756",
        background: "#7A7A7A",
        gris: "#7C7C79",
      },
      dark: {
        primary: colors.blue,
        secondary: "#304156",
        success: colors.green,
        danger: colors.red,
        warning: colors.deepOrange,
        info: colors.indigo
      }
    }
  }
};
