import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';
import React from 'react';
import ProfilHeader from './ProfileHeader';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
`;

const ContainerOne = styled(Container)`
	margin-left: 0;
	margin-right: 0;
	background-color: grey;
	width: 40%;
`;

const ContainerTwo = styled(Container)`
	margin-left: 0;
	margin-right: 0;
	background-color: lightgrey;
`;

const SavedPage: React.FC = () => {
	return (
		<>
			<ProfilHeader firstName="" lastName="" companyName="JobBörse GmbH" type={'Unternehmen'} adress={[]} />
			<Wrapper>
				<ContainerOne>Ausgeschriebene Jobs</ContainerOne>
				<ContainerTwo>TabBar</ContainerTwo>
			</Wrapper>
		</>
	);
};

export default SavedPage;
