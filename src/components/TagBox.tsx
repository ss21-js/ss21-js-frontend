import { css } from '@emotion/react';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RoundedBox from './RoundedBox';
import { stringToHslColor } from 'common/utils';

export interface TagBoxProps {
	content: string;
	paddingX?: number;
	paddingY?: number;
	color?: string;
}

const TagBox: React.FC<TagBoxProps> = ({ content, paddingX, paddingY }) => {
	return (
		<RoundedBox
			paddingX={paddingX ?? 1.5}
			paddingY={paddingY ?? 0.75}
			css={css`
				background-color: ${stringToHslColor(content)};
			`}
		>
			<Typography
				component="span"
				variant="body2"
				css={css`
					font-weight: 600;
					color: #fff;
				`}
			>
				{content}
			</Typography>
		</RoundedBox>
	);
};

export default TagBox;
