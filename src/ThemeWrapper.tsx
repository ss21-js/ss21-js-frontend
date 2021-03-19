import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#e5e5e5',
			main: '#727272',
			dark: '#363839',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff5e50',
			main: '#e41e26',
			dark: '#a90000',
			contrastText: '#fff',
		},
	},
});

interface Props {
	children: React.ReactChild;
}

const ThemeWrapper: React.FC<Props> = (props: Props) => {
	const { children } = props;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
export default ThemeWrapper;
