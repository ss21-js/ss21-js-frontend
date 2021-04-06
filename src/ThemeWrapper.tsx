import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#5768D8',
			main: '#475BD8',
			dark: '#354AD4',
			contrastText: '#fff',
		},
	},
	shape: {
		borderRadius: 6,
	},
	spacing: (factor) => `${0.25 * factor}rem`,
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
