import Button from '@material-ui/core/Button';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const StyledButton = styled<typeof Button>(({ ...props }) => <Button variant="contained" {...props} />)`
	border: 0;
	height: 2.75rem;
	padding: 1rem 2rem;
	text-transform: none;
	line-height: 1;
`;

export default StyledButton;
