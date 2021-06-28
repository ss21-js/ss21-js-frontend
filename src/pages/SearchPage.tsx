import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import styled from '@material-ui/core/styles/styled';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import AppFrame from 'components/app/AppFrame';
import JobDetailsCard from 'components/jobs/JobDetailsCard/JobDetailsCard';
import SearchBar from 'components/search/SearchBar';
import SearchJobsGrid from 'components/jobs/JobsGrid/SearchJobsGrid';
import JobSearchFilters from 'components/search/SearchFilters';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteParams } from 'react-typesafe-routes';
import router from '../Router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import jobSearchParameters from 'store/jobs/jobSearchParameters';
import { useForm } from 'react-hook-form';
import { SearchJobDto } from 'js-api-client';
import { joiResolver } from '@hookform/resolvers/joi';
import { searchJobDtoSchema } from 'models/joiSchemas';
import { useDeepCompareEffect } from 'react-use';

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

	${(props) => props.theme.breakpoints.down('lg')} {
		grid-template-areas:
			'search search search search search search search search search search search search'
			'filter filter filter jobs jobs jobs jobs jobs jobs jobs jobs jobs';
	}

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

const SearchPage: React.FC = () => {
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const history = useHistory();
	const { jobId, ...querySearchParameters } = useRouteParams(router.app.children.search);
	const searchParameters = useRecoilValue(jobSearchParameters);
	const setSearchParameters = useSetRecoilState(jobSearchParameters);

	const {
		control,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm<SearchJobDto>({
		resolver: joiResolver(searchJobDtoSchema),
		defaultValues: { ...searchParameters, ...querySearchParameters },
		mode: 'onBlur',
	});

	useDeepCompareEffect(() => {
		if (searchParameters !== querySearchParameters) {
			history.replace(router.app().search({ ...searchParameters, jobId: jobId }).$);
		}
	}, [searchParameters, querySearchParameters]);

	const searchSubmit = (params: SearchJobDto) => {
		history.replace(router.app().search({ ...searchParameters }).$);
		setSearchParameters(params);
		reset(params);
	};

	const handleJobClick = (newJobId: string) => {
		if (jobId === newJobId) {
			history.replace(router.app().search({ ...searchParameters }).$);
		} else {
			history.replace(router.app().search({ ...searchParameters, jobId: newJobId }).$);
		}
	};

	const handleClose = () => history.replace(router.app().search({ ...searchParameters }).$);

	return (
		<AppFrame>
			{jobId && isMdDown ? (
				<Box padding={4}>
					<JobDetailsCard jobId={jobId} handleClose={handleClose} />
				</Box>
			) : (
				<form onSubmit={handleSubmit(searchSubmit)} noValidate>
					<LayoutContainer>
						<Layout>
							<SearchContainer>
								<SearchBar control={control} isDirty={isDirty} />
							</SearchContainer>
							<FilterContainer>
								<JobSearchFilters control={control} isDirty={isDirty} />
							</FilterContainer>
							<SearchJobsGrid jobId={jobId} handleJobClick={handleJobClick} handleClose={handleClose} />
						</Layout>
					</LayoutContainer>
				</form>
			)}
		</AppFrame>
	);
};

export default SearchPage;
