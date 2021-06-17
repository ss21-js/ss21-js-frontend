import { useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import AppFrame from 'components/app/AppFrame';
import JobDetailsCard from 'components/jobs/JobDetailsCard';
import JobSearchBar from 'components/jobs/JobSearchBar';
import JobsGrid from 'components/jobs/JobsGrid';
import SearchFilters from 'components/jobs/SearchFilters';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteParams } from 'react-typesafe-routes';
import router from '../Router';

const LayoutContainer = styled('div')`
	min-height: 100%;
	padding: ${(props) => props.theme.spacing(4)};
`;

const Layout = styled('div')`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-areas:
		'search search search search search search search search search search search search'
		'filter filter jobs jobs jobs jobs jobs jobs jobs jobs jobs jobs';
	gap: ${(props) => props.theme.spacing(4)};

	${(props) => props.theme.breakpoints.down('md')} {
		column-gap: 0;
		grid-template-areas:
			'search search search search search search search search search search search search'
			'filter filter filter filter filter filter filter filter filter filter filter filter'
			'jobs jobs jobs jobs jobs jobs jobs jobs jobs jobs jobs jobs';
	}
`;

const SearchContainer = styled('div')`
	grid-area: search;
`;

const FilterContainer = styled('div')`
	grid-area: filter;
`;

const JobsPage: React.FC = () => {
	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const { jobId } = useRouteParams(router.app.children.jobs);

	const history = useHistory();

	const handleClose = () => {
		history.push(router.app().jobs({}).$);
	};

	return (
		<AppFrame>
			{jobId && isMdDown ? (
				<Box padding={4}>
					<JobDetailsCard
						job={{
							title: 'UI/UX Designer',
							companyName: 'Dropbox',
							companyLogoUrl:
								'https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20',
							headerImageUrl:
								'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
							description: 'lorem',
							experience: '1 year',
							qualifications: Array(5).fill('Qualification'),
							offerSalary: '$1000 / Month',
							employeeType: 'Full time',
							workLevel: 'Senior',
						}}
						handleClose={handleClose}
					/>
				</Box>
			) : (
				<LayoutContainer>
					<Layout>
						<SearchContainer>
							<JobSearchBar onClick={() => {}} />
						</SearchContainer>
						<FilterContainer>
							<SearchFilters isMobile={isXs} />
						</FilterContainer>
						<JobsGrid jobId={jobId} />
					</Layout>
				</LayoutContainer>
			)}
		</AppFrame>
	);
};

export default JobsPage;
