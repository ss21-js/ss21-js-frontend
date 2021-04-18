import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#65CEEF',
			main: '#0B77BF',
			dark: '#383C7B',
			contrastText: '#fff',
		},
		secondary: {
			main: '#F0F0F0',
			contrastText: '#8E8E96',
		},
	},
});

interface Props {
	children: React.ReactChild;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
export default ThemeWrapper;
