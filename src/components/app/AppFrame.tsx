import { css } from '@emotion/react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import globalLoadingState from 'store/general/globalLoadingState';
import themeModeState, { ThemeMode } from 'store/general/themeModeState';
import AppBar from './AppBar';
import Drawer from './Drawer';
export interface AppFrameProps {
	children: React.ReactNode;
}

const AppFrame: React.FC<AppFrameProps> = ({ children }) => {
	const theme = useTheme();
	const backdropOpen = useRecoilValue(globalLoadingState);

	const [themeMode, setThemeMode] = useRecoilState(themeModeState);
	const handleThemeChange = () => setThemeMode(themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);

	return (
		<>
			<AppBar />
			<Drawer />
			<div
				css={css`
					width: 100%;
					margin-top: 56px;
					height: calc(100% - 56px);
					background-color: ${theme.palette.background.default};
					overflow-y: scroll;
					${theme.breakpoints.up('sm')} {
						height: calc(100% - 64px);
						margin-top: 64px;
					}
				`}
			>
				{children}
				<Fab color="primary" onClick={handleThemeChange} style={{ position: 'fixed', right: 32, bottom: 32 }}>
					<FontAwesomeIcon icon={themeMode === ThemeMode.DARK ? faSun : faMoon} />
				</Fab>
			</div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
				<CircularProgress color="primary" />
			</Backdrop>
		</>
	);
};

export default AppFrame;
