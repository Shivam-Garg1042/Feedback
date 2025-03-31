// tailwind.config.js


// Light Neutrals (for soft backgrounds)

// #F5F5F5 (Light Gray)
// #E8F0F2 (Soft Cool Gray)
// #D9EBE5 (Very Light Teal)
// Muted Tones (for subtle sections)

// #A5C6CE (Muted Cyan)
// #89A9B6 (Soft Blue-Gray)
// #B8D8D6 (Pale Greenish Teal)
// Dark Neutrals (for contrast & dark mode)

// #1B2B2D (Deep Charcoal)
// #2C4A52 (Dark Cyan-Gray)
// #3A5F68 (Muted Deep Teal)

/** @type {import('tailwindcss').Config} */
export default {
  

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003444',
        secondary: '#1e7295',
        accent: '#278c6a',
        background: '#ffffff',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      
      
    },
  },
  //// teamgrid.jsx
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      });
    },
    {
      handler({ addUtilities }) {
        addUtilities({
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }
        });
      }
    },
  ],
}
