import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RoundedBox from './RoundedBox';

export interface TagBoxProps {
	content: string;
	paddingX?: number;
	paddingY?: number;
	color?: string;
}

const TagBox: React.FC<TagBoxProps> = ({ content, paddingX, paddingY, color }) => {
	const theme = useTheme();

	return (
		<RoundedBox
			paddingX={paddingX ?? 1.5}
			paddingY={paddingY ?? 0.75}
			css={css`
				background-color: ${color ?? theme.palette.primary.main}33;
			`}
		>
			<Typography
				component="span"
				variant="body2"
				css={css`
					font-weight: 600;
					color: ${color ?? theme.palette.primary.main};
				`}
			>
				{content}
			</Typography>
		</RoundedBox>
	);
};

export default TagBox;
