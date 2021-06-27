import styled from '@material-ui/core/styles/styled';
import LoadingButton from '@material-ui/lab/LoadingButton';

const StyledButton = styled<typeof LoadingButton>(({ ...props }) => <LoadingButton variant="contained" {...props} />)`
	border: 0;
	height: 2.75rem;
	padding: 1rem 2rem;
	text-transform: none;
	line-height: 1;

	&.Mui-disabled {
		color: ${(props) => props.theme.palette.secondary.contrastText};
	}
`;

export default StyledButton;
