import { css } from '@emotion/react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { useRecoilState } from 'recoil';
import { drawerOpen } from 'src/store/general';

const Drawer: React.FC = () => {
	const [open, setOpen] = useRecoilState(drawerOpen);

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
				div:nth-child(3) {
					max-width: unset;
					width: 100%;
					left: 0 !important;
				}
			`}
		>
			<MenuItem>Test</MenuItem>
			<MenuItem>Test</MenuItem>
			<MenuItem>Test</MenuItem>
		</Menu>
	);
};

export default Drawer;
