/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        deepGray: '#A8A8AB'
      },
      width: {
        'cal': 'calc(100% / 9 - 5px)',
      },
      animation: {
        'user_shake': 'userShake 0.7s ease infinite',
        'cpu_shake': 'cpuShake 0.7s ease infinite',
      },
      keyframes: {
        userShake: {
          '50%': { transform: 'rotate(10deg)' },

        },
        cpuShake: {
          '50%': { transform: 'rotate(-10deg)' },
        }
      }
    },
  },
  plugins: [],
}

