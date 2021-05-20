import { css } from '@emotion/react';
import { useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { experimentalStyled as styled, Theme, useTheme } from '@material-ui/core/styles';
import { wrapGrid } from 'animate-css-grid';
import React, { createRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteParams } from 'react-typesafe-routes';
import AppFrame from 'src/components/app/AppFrame';
import JobCard from 'src/components/search/JobCard';
import JobDetailsCard from 'src/components/search/JobDetailsCard';
import JobSearchBar from 'src/components/search/JobSearchBar';
import SearchFilters from 'src/components/search/SearchFilters';
import router from 'src/Router';

const Layout = styled('div')`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-areas:
		'search search search search search search search search search search search search'
		'filter filter jobs jobs jobs jobs jobs jobs jobs jobs jobs jobs';
	gap: ${(props) => props.theme.spacing(4)};
	padding: ${(props) => props.theme.spacing(4)};

	${(props) => props.theme.breakpoints.down('md')} {
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

const JobsContainer = styled('div')`
	grid-area: jobs;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${(props) => props.theme.spacing(4)};
	${(props) => props.theme.breakpoints.down('lg')} {
		grid-template-columns: repeat(2, 1fr);
	}
	${(props) => props.theme.breakpoints.down('md')} {
		grid-template-columns: repeat(1, 1fr);
	}
`;

// const JobDetailsContainer = styled('div')`
// 	grid-column: 2 / span 2;
// `;

const JobsPage: React.FC = () => {
	const theme = useTheme();
	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const gridRef = createRef<HTMLDivElement>();
	useEffect(() => {
		if (gridRef.current) {
			wrapGrid(gridRef.current, { easing: 'backOut', stagger: 10, duration: 400 });
		}
	}, []);

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
			{jobId && isMdDown ? (
				<Box padding={4}>
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
							qualifications: Array(5).fill('Qualification'),
							offerSalary: '$1000 / Month',
							employeeType: 'Full time',
							workLevel: 'Senior',
						}}
						handleClose={handleClose}
					/>
				</Box>
			) : (
				<Layout>
					<SearchContainer>
						<JobSearchBar onClick={() => {}} />
					</SearchContainer>
					<FilterContainer>
						<Grid item lg={2} md={3} sm={12} xs={12} position="relative">
							<SearchFilters isMobile={isXs} />
						</Grid>
					</FilterContainer>
					<JobsContainer ref={gridRef}>
						{Array(30)
							.fill(1)
							.map((_, i) => (
								<Box
									css={
										jobId == i.toString() &&
										css`
											grid-column: auto / span 3;
											grid-row: auto / span 3;

											${theme.breakpoints.down('lg')} {
												grid-column: auto / span 2;
											}
										`
									}
									sx={{
										gridColumn: 'auto / span 1',
									}}
									key={i}
								>
									{jobId == i.toString() ? (
										<JobDetailsCard
											box={{
												sx: {
													height: '100%',
												},
											}}
											job={{
												title: 'UI/UX Designer',
												companyName: 'Patreon',
												companyLogoUrl:
													'https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20',
												headerImageUrl:
													'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
												description:
													'Id semper risus in hendrerit gravida rutrum. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Habitant morbi tristique senectus et netus. Odio aenean sed adipiscing diam donec. Curabitur vitae nunc sed velit dignissim. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Id donec ultrices tincidunt arcu non sodales neque. A lacus vestibulum sed arcu non odio euismod. Amet luctus venenatis lectus magna fringilla urna. Elementum eu facilisis sed odio morbi quis. Malesuada pellentesque elit eget gravida cum. Arcu felis bibendum ut tristique et. Tellus rutrum tellus pellentesque eu tincidunt tortor. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Sociis natoque penatibus et magnis dis parturient. Enim nec dui nunc mattis. Eget est lorem ipsum dolor sit amet consectetur. Tortor id aliquet lectus proin nibh nisl. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Ut faucibus pulvinar elementum integer enim neque volutpat.',
												experience: '1 year',
												qualifications: Array(12).fill('Qualification'),
												offerSalary: '$1000 / Month',
												employeeType: 'Full time',
												workLevel: 'Senior',
											}}
											handleClose={handleClose}
										/>
									) : (
										<JobCard
											title="UI/UX Designer"
											description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
											image="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20"
											tags={['Full-Time', '1 year Experience']}
											selected={jobId === i.toString()}
											onClick={() => handleJobClick(i.toString())}
										/>
									)}
								</Box>
							))}
						{/* {jobId && (
							<JobDetailsContainer>
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
							</JobDetailsContainer>
						)} */}
					</JobsContainer>
				</Layout>
			)}
		</AppFrame>
	);
};

export default JobsPage;
