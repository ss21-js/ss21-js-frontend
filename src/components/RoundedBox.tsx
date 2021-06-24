import Box, { BoxProps } from '@material-ui/core/Box';
import styled from '@material-ui/core/styles/styled';

const RoundedBox = styled(Box)<Omit<BoxProps, 'borderRadius'>>`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	border: solid ${(props) => props.theme.palette.divider} 1px;
`;

// const RoundedBox: React.FC<Omit<BoxProps, 'borderRadius'>> = (props) => {
// 	const theme = useTheme();

// 	return (
// 		<Box
// 			css={css`
// 				background-color: ${theme.palette.background.paper};
// 				border-radius: ${theme.shape.borderRadius};
// 			`}
// 			{...props}
// 		/>
// 	);
// };

export default RoundedBox;
