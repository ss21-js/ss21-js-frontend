import styled from '@emotion/styled';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CompanyTable from 'components/company/CompanyTable';
import { Job } from 'js-api-client';
import React from 'react';

const UiDivider = styled(Divider)`
	margin-top: 10px;
`;

const UiTypography = styled(Typography)`
	margin-top: 10px;
	margin-bottom: 10px;
`;

interface OpenJobOffersProps {
	jobs: Job[];
}

const OpenJobOffers: React.FC<OpenJobOffersProps> = ({ jobs }) => {
	return (
		<>
			<CompanyTable jobs={[]} />
			<UiDivider />
			<UiTypography variant="h6">Vergangene Jobs: </UiTypography>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Job Name:</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jobs.map((job) => (
							<TableRow key={job.id}>
								<TableCell component="th" scope="row">
									{job.jobName}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default OpenJobOffers;
