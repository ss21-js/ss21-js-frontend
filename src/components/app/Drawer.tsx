import { css } from '@emotion/react';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useRecoilState } from 'recoil';
import drawerOpenState from 'store/general/drawerOpenState';
import Navigation from './Navigation';

const Drawer: React.FC = () => {
	const [open, setOpen] = useRecoilState(drawerOpenState);

	const isTiny = useMediaQuery('@media(max-width: 360px)');

	const handleClose = () => setOpen(false);

	return (
		<Menu
			id="menu-appbar"
			anchorReference="anchorPosition"
			anchorPosition={{ top: 56, left: 0 }}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			open={open}
			onClose={handleClose}
			elevation={0}
			css={css`
				div:nth-of-type(3) {
					max-width: unset;
					width: 100%;
					left: 0 !important;
				}
			`}
		>
			<Navigation vertical={isTiny} />
		</Menu>
	);
};

export default Drawer;
