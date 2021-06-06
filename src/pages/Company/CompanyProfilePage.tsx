import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TabBar from 'src/components/TabBar';
import AboutUsCompany from './AboutUsCompany';
import OpenJobOffers from './OpenJobOffers';

const GridContainer = styled(Grid)`
	background-color: #efefef;
	width: -webkit-fill-available;
`;

const Container = styled.div`
	margin-bottom: 40px;
`;

const CompanyProfilePage: React.FC = () => {
	return (
		<GridContainer>
			<Container>
				<TabBar
					tab={[
						{
							tabTitle: 'Jobangebote',
							tabContent: <OpenJobOffers />,
						},
						{
							tabTitle: 'Über uns',
							tabContent: <AboutUsCompany />,
						},
					]}
				/>
			</Container>
		</GridContainer>
	);
};

export default CompanyProfilePage;
