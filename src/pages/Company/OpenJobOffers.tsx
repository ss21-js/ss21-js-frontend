import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import JobCard from 'components/jobs/JobCard';
import React from 'react';

const UiDivider = styled(Divider)`
	margin-top: 10px;
`;

const UiTypography = styled(Typography)`
	margin-top: 10px;
	margin-bottom: 10px;
`;

const OpenJobOffers: React.FC = () => {
	function createData(description: string) {
		return { description };
	}

	//Daten aus dem BE vom Job benutzen
	const rows = [createData('UX Designer'), createData('React FE Developer'), createData('Fullstack Developer')];

	return (
		<Box padding={3}>
			<JobCard
				title="UI/UX Designer"
				description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
				image="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20"
				tags={['Full-Time', '1 year Experience']}
				selected
			/>
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
						{rows.map((row) => (
							<TableRow key={row.description}>
								<TableCell component="th" scope="row">
									{row.description}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default OpenJobOffers;
