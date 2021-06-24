import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import TabBar from 'components/TabBar';
import React from 'react';
import AboutUsCompany from './AboutUsCompany';
import OpenJobOffers from './OpenJobOffers';

const GridContainer = styled(Grid)`
	background-color: #efefef;
	width: -webkit-fill-available;
`;

const CompanyProfilePage: React.FC = () => {
	return (
		<GridContainer>
			<TabBar
				tabs={[
					{
						title: 'Jobangebote',
						component: <OpenJobOffers jobs={[]} />,
					},
					{
						title: 'Über uns',
						component: <AboutUsCompany />,
					},
				]}
			/>
		</GridContainer>
	);
};

export default CompanyProfilePage;
