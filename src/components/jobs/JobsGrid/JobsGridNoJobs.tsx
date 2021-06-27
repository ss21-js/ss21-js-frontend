import React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Center from 'components/layout/Center';

const NoJobsCenter = styled(Center)`
	grid-column: auto-fill;
	grid-row: auto / span 3;
	grid-area: jobs;
`;

const JobsGridNoJobs = () => {
	return (
		<NoJobsCenter>
			<Center>Keine Jobs gefunden</Center>
		</NoJobsCenter>
	);
};

export default JobsGridNoJobs;
