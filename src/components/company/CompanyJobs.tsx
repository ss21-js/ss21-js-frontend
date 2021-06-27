import styled from '@emotion/styled';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { JobWithCompany } from 'js-api-client';
import React from 'react';
import RoundedBox from 'components/RoundedBox';
import Box from '@material-ui/core/Box';

const UiDivider = styled(Divider)`
	margin-top: 10px;
`;

const UiTypography = styled(Typography)`
	margin-top: 10px;
	margin-bottom: 10px;
`;

interface OpenJobOffersProps {
	jobs: JobWithCompany[];
}

const CompanyJobs: React.FC<OpenJobOffersProps> = ({ jobs }) => {
	return (
		<>
			<UiDivider />
			<Box marginTop={3} marginBottom={2}>
				<UiTypography variant="h6">Vergangene Jobs</UiTypography>
			</Box>
			<TableContainer component={RoundedBox}>
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

export default CompanyJobs;
