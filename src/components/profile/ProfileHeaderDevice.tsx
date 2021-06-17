import { css } from '@emotion/react';
import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

export interface ProfileHeaderDeviceProps {
	children: React.ReactNode;
}

const ProfileHeaderDevice: React.FC<ProfileHeaderDeviceProps> = ({ children }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<div
			css={
				isMobile
					? css`
							text-align: -webkit-center;
							margin-top: 20px;
							margin-bottom: 20px;
					  `
					: css`
							align-self: center;
							margin-top: 0;
							margin-bottom: 0;
					  `
			}
		>
			{children}
		</div>
	);
};

export default ProfileHeaderDevice;
