import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	/* Import Google Font: Poppins (sans-serif, modern) */
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap');

	:root{
		--color-text: #1a1a1a;
		--color-bg: #ffffff;
		--font-sans: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}

	*, *::before, *::after { box-sizing: border-box; }
	html, body, #root { height: 100%; }
	html { font-size: 16px; }

	body {
		margin: 0;
		font-family: var(--font-sans);
		background: var(--color-bg);
		color: var(--color-text);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		line-height: 1.5;
	}

	/* Responsive typographic scale similar to L'Oréal site */
	/* Increased max sizes (h1 up to 56px etc.) */
	h1 { font-weight: 700; font-size: clamp(28px, 5vw, 56px); margin: 0 0 .5rem; }
	h2 { font-weight: 600; font-size: clamp(24px, 4vw, 40px); margin: 0 0 .5rem; }
	h3 { font-weight: 500; font-size: clamp(20px, 3.2vw, 32px); margin: 0 0 .5rem; }
	h4 { font-weight: 500; font-size: clamp(18px, 2.4vw, 24px); margin: 0 0 .5rem; }
	h5 { font-weight: 500; font-size: 16px; margin: 0 0 .5rem; }
	h6 { font-weight: 400; font-size: 14px; margin: 0 0 .5rem; }

	p { margin: 0 0 1rem; }
	a { color: inherit; text-decoration: none; }
	ul, ol { padding-left: 1.25rem; margin: 0 0 1rem; }
`;

export default GlobalStyle;

