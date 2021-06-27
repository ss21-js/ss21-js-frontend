import { experimentalStyled as styled } from '@material-ui/core/styles';

const JobsGridContainer = styled('div')`
	grid-area: jobs;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${(props) => props.theme.spacing(4)};

	${(props) => props.theme.breakpoints.down('lg')} {
		grid-template-columns: repeat(2, 1fr);
	}

	${(props) => props.theme.breakpoints.down('md')} {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export default JobsGridContainer;
