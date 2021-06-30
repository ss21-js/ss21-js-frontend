import Box from '@material-ui/core/Box';
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
import Divider from '@material-ui/core/Divider';
import { JobCardContent } from 'components/jobs/JobCard';
import CompanyJobStudentRow from 'components/company/CompanyJob/CompanyJobStudentRow';

interface RowProps {
	job: JobWithCompany;
}

const CompanyJob: React.FC<RowProps> = ({ job }) => {
	return (
		<RoundedBox padding={3} width={'100%'}>
			<JobCardContent job={job} />
			<Box marginTop={3} marginBottom={2}>
				<Divider />
			</Box>
			<Typography variant="h6" gutterBottom>
				Bewerber
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Skillmatch</TableCell>
							<TableCell align="right">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(job.requestedByStudents ?? []).map((studentId) => (
							<CompanyJobStudentRow key={studentId} job={job} studentId={studentId} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</RoundedBox>
	);
};
export default CompanyJob;
