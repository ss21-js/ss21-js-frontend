import styled from '@material-ui/core/styles/styled';
import React from 'react';
import UndrawFeelingProud from '../../assets/undraw_feeling_proud.svg';

const Img = styled('img')`
	margin-right: 3vw;
	max-width: 40vw;

	${(props) => props.theme.breakpoints.down('md')} {
		max-width: min(60vw, 400px);
		margin-bottom: min(5vh, 64px);
	}
`;

const LandingImage: React.FC = () => {
	return <Img src={UndrawFeelingProud} alt="" />;
};

export default LandingImage;
