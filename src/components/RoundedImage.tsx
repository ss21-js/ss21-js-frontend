import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';

const RoundedImage = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
	const theme = useTheme();

	return (
		<img
			css={css`
				border-radius: ${theme.shape.borderRadius};
			`}
			{...props}
		/>
	);
};
export default RoundedImage;
