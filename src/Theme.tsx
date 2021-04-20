import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeMode, themeMode } from './store/general';

const paletteLight: PaletteOptions = {
	primary: {
		light: '#65CEEF',
		main: '#0B77BF',
		dark: '#383C7B',
		contrastText: '#fff',
	},
	secondary: {
		main: '#F0F0F0',
		contrastText: '#7e7e85',
	},
	background: {
		default: '#fff',
		paper: '#fafafb',
	},
};

const paletteDark: PaletteOptions = {
	primary: {
		light: '#383C7B',
		main: '#0B77BF',
		dark: '#65CEEF',
		contrastText: '#fff',
	},
	secondary: {
		main: '#292931',
		contrastText: '#65666E',
	},
	background: {
		default: '#131418',
		paper: '#1C1C24',
	},
};
interface Props {
	children: React.ReactChild;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
	const mode = useRecoilValue(themeMode);
	const theme = useMemo(() => {
		let palette: PaletteOptions;

		switch (mode) {
			case ThemeMode.LIGHT:
				palette = paletteLight;
				break;
			case ThemeMode.DARK:
				palette = paletteDark;
				break;
		}

		return createMuiTheme({
			palette: palette,
			shape: {
				borderRadius: '0.6rem',
			},
		});
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
export default ThemeWrapper;
