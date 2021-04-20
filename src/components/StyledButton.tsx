import { css } from '@emotion/react';
import { ButtonProps } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const StyledButton: React.FC<ButtonProps> = (props) => {
	return (
		<Button
			variant="contained"
			css={css`
				border: 0;
				height: 2.75rem;
				padding: 1rem 2rem;
				text-transform: none;
			`}
			{...props}
		/>
	);
};

export default StyledButton;
