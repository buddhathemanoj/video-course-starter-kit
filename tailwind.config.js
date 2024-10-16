/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	fontFamily: {
  		cal: ["Cal Sans", "Inter var", "sans-serif"]
  	},
  	extend: {
  		colors: {
  			current: 'currentColor',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		width: {
  			'1536': '1536px'
  		},
  		height: {
  			'150': '37.5rem'
  		},
  		margin: {
  			'30': '7.5rem'
  		},
  		fontFamily: {
  			sans: ["Inter var", ...defaultTheme.fontFamily.sans],
  			mono: ["Consolas", ...defaultTheme.fontFamily.mono]
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					h1: {
  						fontFamily: 'Cal Sans'
  					},
  					h2: {
  						fontFamily: 'Cal Sans'
  					},
  					h3: {
  						fontFamily: 'Cal Sans'
  					},
  					'blockquote p:first-of-type::before': {
  						content: 'none'
  					},
  					'blockquote p:first-of-type::after': {
  						content: 'none'
  					}
  				}
  			}
  		},
  		keyframes: {
  			wiggle: {
  				'0%, 100%': {
  					transform: 'translateX(0%)',
  					transformOrigin: '50% 50%'
  				},
  				'15%': {
  					transform: 'translateX(-6px) rotate(-6deg)'
  				},
  				'30%': {
  					transform: 'translateX(9px) rotate(6deg)'
  				},
  				'45%': {
  					transform: 'translateX(-9px) rotate(-3.6deg)'
  				},
  				'60%': {
  					transform: 'translateX(3px) rotate(2.4deg)'
  				},
  				'75%': {
  					transform: 'translateX(-2px) rotate(-1.2deg)'
  				}
  			}
  		},
  		animation: {
  			wiggle: 'wiggle 0.8s both'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
