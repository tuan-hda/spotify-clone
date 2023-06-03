/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['2rem', '2rem'],
        ss: ['0.6875rem', '1.1rem']
      },
      boxShadow: {
        's-1': '10px 0px 20px -5px rgba(0, 0, 0, 0.4)',
        's-2': '0px 10px 20px -5px rgba(0, 0, 0, 0.25)',
        's-3': '0 2px 4px 0 rgba(0,0,0,.2)',
        's-4': '0 8px 24px rgba(0,0,0,.5)',
        's-5': '0 4px 60px rgba(0,0,0,.5)'
      },
      colors: {
        's-black': {
          1: '#191414',
          2: '#0D1118',
          3: '#121212',
          4: '#171717',
          5: '#181818',
          6: '#050505',
          7: '#131313',
          8: '#202020',
          9: '#1B1B1B',
          10: '#1E1E1E'
        },
        's-green': {
          1: '#1ED760',
          2: '#1ED760',
          3: '#169C46',
          4: '#1DB954',
          5: '#1DCE5C',
          6: '#1FDF64'
        },
        's-gray': {
          1: '#b2b2b2',
          2: '#282828',
          3: '#6A6A6A',
          4: '#323232',
          5: '#afafaf',
          6: '#5E5E5E',
          7: '#a7a7a7',
          8: '#b3b3b3',
          9: '#2A2A2A',
          10: '#757575',
          11: '#232323',
          12: '#333333',
          13: '#5A5A5A',
          14: '#3E3E3E',
          15: '#3D3D3D',
          16: '#343434'
        },
        's-blue': {
          1: '#1A2334',
          2: '#2E3D5A'
        },
        's-white': {
          1: '#F6F6F6'
        },
        's-purple': {
          1: '#450AF5',
          2: '#8E8EE5'
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')],
  corePlugins: {
    // textOpacity: false,
    // backgroundOpacity: false,
    // borderOpacity: false,
    // divideOpacity: false,
    // placeholderOpacity: false,
    // ringOpacity: false,
  }
}
