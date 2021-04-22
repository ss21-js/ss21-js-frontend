import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { globalLoading } from 'src/store/general';
import AppBar from './AppBar';
import Drawer from './Drawer';

export interface AppFrameProps {
	children: React.ReactNode;
}

const AppFrame: React.FC<AppFrameProps> = ({ children }) => {
	const theme = useTheme();
	const backdropOpen = useRecoilValue(globalLoading);

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
					${theme.breakpoints.up('sm')} {
						height: calc(100% - 64px);
						margin-top: 64px;
					}
				`}
			>
				{children}
			</div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
				<CircularProgress color="primary" />
			</Backdrop>
		</>
	);
};

export default AppFrame;
