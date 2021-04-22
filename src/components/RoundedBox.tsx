import { css } from '@emotion/react';
import { BoxProps, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const RoundedBox: React.FC<Omit<BoxProps, 'borderRadius'>> = (props) => {
	const theme = useTheme();

	return (
		<Box
			css={css`
				background-color: ${theme.palette.background.paper};
				border-radius: ${theme.shape.borderRadius};
			`}
			{...props}
		/>
	);
};

export default RoundedBox;
