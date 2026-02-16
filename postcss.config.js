export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}, // autoprefixer is usually not needed inside @tailwindcss/postcss in v4 but might be kept for compatibility if needed. Actually it's better to stick with what works for v4.
  },
}
