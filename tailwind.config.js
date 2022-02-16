module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23f1f5f9'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
      },
      backgroundPosition: {
        '10-10': '10px 10px'
      },
      backgroundColor: {
        'blue-primary': '#06f',
        'blue-primary-hover': '#005ce6'
      },
      boxShadow: {
        subtle: 'rgb(255 255 255 / 0%) 0 0 0 3px, rgb(0 102 255 / 0%) 0 0 0 4px',
        'blue-primary': 'rgb(0 102 255 / 20%) 0 0 0 5px'
      }
    },
  },
  plugins: [],
}