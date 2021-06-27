import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import LoadingButton from '@material-ui/lab/LoadingButton';

export interface IconButtonProps {
	icon: IconProp;
	onClick?: () => void;
	loading?: boolean;
}

const StyledIconButton: React.FC<IconButtonProps> = ({ icon, onClick, loading }) => {
	const theme = useTheme();

	return (
		<LoadingButton
			css={css`
				width: 40px;
				height: 40px;
				padding: ${theme.spacing(1)};
				border: 1px solid ${theme.palette.secondary.main};
				border-radius: ${theme.shape.borderRadius};
			`}
			disabled={onClick === undefined}
			onClick={onClick}
			loading={loading}
		>
			<FontAwesomeIcon icon={icon} size="lg" color={theme.palette.secondary.dark} />
		</LoadingButton>
	);
};

export default StyledIconButton;
