import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { JobWithCompany, Student } from 'js-api-client';
import React from 'react';
import RoundedBox from 'components/RoundedBox';
import Divider from '@material-ui/core/Divider';
import intersection from 'lodash/intersection';
import { JobCardContent } from 'components/jobs/JobCard';

interface RowProps {
	job: JobWithCompany;
	students: Student[];
}

const CompanyJob: React.FC<RowProps> = ({ job, students }) => {
	const handleAccept = () => {
		//
	};

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
						{students.map((student) => {
							const jobSL = [...job.skills, ...job.languages];
							const studentSL = [...student.skills, ...student.languages];

							const matches = intersection(jobSL, studentSL);
							const match = (matches.length / jobSL.length).toPrecision(2);

							return (
								<TableRow key={student.id}>
									<TableCell>
										{student.firstName}
										{student.lastName}
									</TableCell>
									<TableCell>{match}%</TableCell>
									<TableCell align="right">
										<Button onClick={handleAccept}>Annehmen</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</RoundedBox>
	);
};
export default CompanyJob;
