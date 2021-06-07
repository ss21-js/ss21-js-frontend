import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import React from 'react';

export interface IconButtonProps {
	icon: IconProp;
	onClick: () => void;
}

const StyledIconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
	const theme = useTheme();

	return (
		<ButtonBase
			css={css`
				width: 40px;
				height: 40px;
				padding: ${theme.spacing(1)};
				border: 1px solid ${theme.palette.secondary.main};
				border-radius: ${theme.shape.borderRadius};
			`}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} size="lg" color={theme.palette.secondary.dark} />
		</ButtonBase>
	);
};

export default StyledIconButton;
