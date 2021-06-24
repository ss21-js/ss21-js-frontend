import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import JobCard from 'components/jobs/JobCard';
import { Job, Student } from 'js-api-client';
import React from 'react';

interface RowProps {
	job: Job;
	students: Student[];
}

const Row: React.FC<RowProps> = ({ students }) => {
	const handleAccept = () => {
		//
	};

	return (
		<React.Fragment>
			<JobCard
				title="UI/UX Designer"
				description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				image="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20"
				tags={['Full-Time', '1 year Experience']}
				selected
			/>
			<Box marginTop={-3}>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={true} timeout="auto" unmountOnExit>
							<Box margin={1}>
								<Typography variant="h6" gutterBottom component="div">
									Studentenbewerber
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>Studentenprofil</TableCell>
											<TableCell
												align="right"
												css={css`
													padding-right: 3rem;
												`}
											>
												Status
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{students.map((student) => (
											<TableRow key={student.id}>
												<TableCell component="th" scope="row">
													{student.firstName}
													{student.lastName}
												</TableCell>
												<TableCell align="right">
													<Button onClick={handleAccept}>Annehmen</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</Box>
		</React.Fragment>
	);
};

interface CollapsibleTableProps {
	jobs: Job[];
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ jobs }) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableBody>
					{jobs.map((job) => (
						<Row key={job.id} job={job} students={[]} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CollapsibleTable;
