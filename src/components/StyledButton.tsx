import { css } from '@emotion/react';
import { ButtonProps } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const StyledButton = (props: ButtonProps) => (
	<Button
		variant="contained"
		css={css`
			border: 0;
			border-radius: 0.5rem;
			height: 2rem;
			padding: 1rem 2rem;
			text-transform: none;
		`}
		{...props}
	/>
);

export default StyledButton;
