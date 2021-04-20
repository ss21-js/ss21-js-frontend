import { Theme, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import AppFrame from 'src/components/app/AppFrame';
import JobCard from 'src/components/JobCard';
import SearchBar from 'src/components/search/SearchBar';
import SearchFilters from 'src/components/search/SearchFilters';

const SearchPage: React.FC = () => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

	return (
		<AppFrame>
			<Grid container justifyContent="center" spacing={4} padding={4}>
				<Grid item xs={12}>
					<SearchBar />
				</Grid>
				<Grid item lg={2} md={3} sm={4} xs={12} position="relative">
					<SearchFilters isMobile={isMobile} />
				</Grid>
				<Grid item lg={10} md={9} sm={8} xs={12}>
					<Grid container spacing={4}>
						{Array(30)
							.fill(1)
							.map((_, i) => (
								<Grid item lg={4} md={6} xs={12} key={i}>
									<JobCard
										title="UI/UX Designer"
										description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
										image="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20"
										tags={['Full-Time', '1 year Experience']}
									/>
								</Grid>
							))}
					</Grid>
				</Grid>
			</Grid>
		</AppFrame>
	);
};

export default SearchPage;
