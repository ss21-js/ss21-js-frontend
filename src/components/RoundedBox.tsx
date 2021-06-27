import Box, { BoxProps } from '@material-ui/core/Box';
import styled from '@material-ui/core/styles/styled';

const RoundedBox = styled(Box)<Omit<BoxProps, 'borderRadius'>>`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	border: solid ${(props) => props.theme.palette.divider} 1px;
	overflow: hidden;
`;

export default RoundedBox;
