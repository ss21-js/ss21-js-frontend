import { css } from '@emotion/react';
import Menu from '@material-ui/core/Menu';
import React from 'react';
import { useRecoilState } from 'recoil';
import drawerOpenState from 'store/general/drawerOpenState';
import Navigation from './Navigation';

const Drawer: React.FC = () => {
	const [open, setOpen] = useRecoilState(drawerOpenState);

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
			<Navigation />
		</Menu>
	);
};

export default Drawer;
