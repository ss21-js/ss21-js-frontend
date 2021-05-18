import { css } from '@emotion/react';
import { Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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

const SearchPage: React.FC<SearchPageProps> = ({ onClick }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

	const history = useHistory();
	const { jobId } = useRouteParams(router.app.children.search);

	const handleJobClick = (newJobId: string) => {
		if (jobId === newJobId) {
			history.push(router.app().search({}).$);
		} else {
			history.push(router.app().search({ jobId: newJobId }).$);
		}
	};

	return (
		<AppFrame>
			<Grid container justifyContent="center" spacing={4} padding={4}>
				<Grid item xs={12}>
					<Container maxWidth="xl">
						<JobSearchBar onClick={onClick} />
					</Container>
				</Grid>
				<Grid item lg={2} md={3} sm={4} xs={12} position="relative">
					<SearchFilters isMobile={isMobile} />
				</Grid>
				<Grid item lg md sm={8} xs={12}>
					<JobGrid
						activeJobId={jobId ?? null}
						jobs={[]}
						onJobClick={handleJobClick}
						singleColumn={jobId !== undefined}
					/>
				</Grid>
				{jobId && (
					<Grid item lg={7} md={6} sm={8} xs={12}>
						<div
							css={css`
								position: sticky;
								top: 0;
								margin-top: -${theme.spacing(3)};
								padding-top: ${theme.spacing(3)};
							`}
						>
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
							/>
						</div>
					</Grid>
				)}
			</Grid>
		</AppFrame>
	);
};

export default SearchPage;
