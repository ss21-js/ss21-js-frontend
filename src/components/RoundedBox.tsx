import { css } from '@emotion/react';
import Box, { BoxProps } from '@material-ui/core/Box';
import useTheme from '@material-ui/core/styles/useTheme';

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
