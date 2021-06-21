import Container from '@material-ui/core/Container';
import styled from '@material-ui/core/styles/styled';

const CenterContainer = styled(Container)`
	width: 100%;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${(props) => props.theme.spacing(3)};
`;

export default CenterContainer;
