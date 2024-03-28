/** @type {import('tailwindcss').Config} */
import themer from "@tailus/themer";
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./*.html", "./*.js"],
    darkMode: "media",
    safelist: ["isToggled"],
    theme: {
        colors: ({ colors }) => ({
            primary: colors.green,
            secondary: colors.lime,
            accent: colors.yellow,
            success: colors.lime,
            danger: colors.red,
            warning: colors.yellow,
            info: colors.sky,
            gray: colors.slate,
            white: colors.white,
            black: colors.black,
            transparent: colors.transparent,
      }),
      fontFamily: {
        sans: ['Geist', 'Inter', ...defaultTheme.fontFamily.sans],
        mono : ['GeistMono', 'fira-code', ...defaultTheme.fontFamily.mono],
      },
        keyframes: {
            loop: {
                to: {
                    "offset-distance": "100%",
                },
            },
        },
        
    },
    plugins: [
        themer({
            radius: "smooth",
            background: "light",
            border: "light",
            padding:"large",
            components: {
                button: {
                    rounded : "lg"
                }
            }
        })
    ],
};
