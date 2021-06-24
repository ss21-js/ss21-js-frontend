import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import createTheme from '@material-ui/core/styles/createTheme';
import ThemeProvider from '@material-ui/core/styles/ThemeProvider';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeMode, themeModeAtom } from './store/general';

export const theme = {};

const paletteLight: PaletteOptions = {
	primary: {
		light: '#65CEEF',
		main: '#0B77BF',
		dark: '#383C7B',
		contrastText: '#fff',
	},
	secondary: {
		main: '#F0F0F0',
		dark: '#292931',
		contrastText: '#7e7e85',
	},
	text: {
		primary: '#000',
		secondary: '#1b1b1b',
	},
	background: {
		default: '#efefef',
		paper: '#fafafb',
	},
};

const themeLight = createMuiTheme({
	palette: paletteLight,
	shape: {
		borderRadius: '0.6rem',
	},
});

const paletteDark: PaletteOptions = {
	primary: {
		light: '#383C7B',
		main: '#0B77BF',
		dark: '#65CEEF',
		contrastText: '#fff',
	},
	secondary: {
		main: '#292931',
		dark: '#F0F0F0',
		contrastText: '#cfd0df',
	},
	text: {
		primary: '#fff',
		secondary: '#f1f1f1',
	},
	divider: '#434961',
	background: {
		default: '#272727',
		paper: '#333333',
	},
};

const themeDark = createTheme({
	palette: paletteDark,
	shape: {
		borderRadius: '0.6rem',
	},
});

interface Props {
	children: React.ReactChild;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
	const mode = useRecoilValue(themeModeAtom);

	const theme = React.useMemo(() => {
		switch (mode) {
			case ThemeMode.LIGHT:
				return themeLight;
			case ThemeMode.DARK:
				return themeDark;
		}
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
export default ThemeWrapper;
