import { experimentalStyled as styled } from '@material-ui/core/styles';

const RoundedImage = styled('img')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
`;

export default RoundedImage;
