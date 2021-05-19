import { useMediaQuery } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteParams } from 'react-typesafe-routes';
import AppFrame from 'src/components/app/AppFrame';
import JobDetailsCard from 'src/components/search/JobDetailsCard';
import JobGrid from 'src/components/search/JobGrid';
import JobSearchBar from 'src/components/search/JobSearchBar';
import SearchFilters from 'src/components/search/SearchFilters';
import router from 'src/Router';

export interface SearchPageProps {
	onClick: () => void;
}

const JobsPage: React.FC<SearchPageProps> = ({ onClick }) => {
	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const history = useHistory();
	const { jobId } = useRouteParams(router.app.children.jobs);

	const handleJobClick = (newJobId: string) => {
		if (jobId === newJobId) {
			history.push(router.app().jobs({}).$);
		} else {
			history.push(router.app().jobs({ jobId: newJobId }).$);
		}
	};

	const handleClose = () => {
		history.push(router.app().jobs({}).$);
	};

	return (
		<AppFrame>
			<Grid container justifyContent="center" spacing={4} padding={4}>
				{jobId && isMdDown ? (
					<Grid item xs={12}>
						<JobDetailsCard
							job={{
								title: 'UI/UX Designer',
								companyName: 'Patreon',
								companyLogoUrl:
									'https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20',
								headerImageUrl:
									'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
								description: 'lorem',
								experience: '1 year',
								qualifications: Array(7).fill('Qualification'),
								offerSalary: '$1000 / Month',
								employeeType: 'Full time',
								workLevel: 'Senior',
							}}
							handleClose={handleClose}
						/>
					</Grid>
				) : (
					<>
						<Grid item xs={12}>
							<Container maxWidth="xl">
								<JobSearchBar onClick={onClick} />
							</Container>
						</Grid>
						<Grid item lg={2} md={3} sm={12} xs={12} position="relative">
							<SearchFilters isMobile={isXs} />
						</Grid>
						<Grid item lg md sm={12}>
							<JobGrid
								activeJobId={jobId ?? null}
								jobs={[]}
								onJobClick={handleJobClick}
								singleColumn={jobId !== undefined}
							/>
						</Grid>
						{jobId && (
							<Grid item lg={7} md={6} sm={12}>
								<JobDetailsCard
									job={{
										title: 'UI/UX Designer',
										companyName: 'Patreon',
										companyLogoUrl:
											'https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20',
										headerImageUrl:
											'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
										description: 'lorem',
										experience: '1 year',
										qualifications: Array(7).fill('Qualification'),
										offerSalary: '$1000 / Month',
										employeeType: 'Full time',
										workLevel: 'Senior',
									}}
									handleClose={handleClose}
								/>
							</Grid>
						)}
					</>
				)}
			</Grid>
		</AppFrame>
	);
};

export default JobsPage;
