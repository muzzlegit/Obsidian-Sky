export const THEME = {
  colors: {
    bgPrimary: "#192440",
    bgSecondary: "#253e54",
    textPrimary: "#bcae85",
    red: "#BB0A01",
    green: "#06EC38",
    orange: "#F7AD0E",
  },
  gradients: {
    primary: "radial-gradient(circle, #253e54 0%, #192440 100%)",
  },
};

export type AppThemeType = typeof THEME;

export type ColorsType = keyof (typeof THEME)["colors"];
