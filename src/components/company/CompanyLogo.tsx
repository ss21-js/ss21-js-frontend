import styled from '@material-ui/core/styles/styled';
import React from 'react';

const CompanyLogoContainer = styled('div')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 128px;
	height: 128px;
	padding: 8px;
`;

const CompanyLogoImg = styled('img')`
	width: 100%;
	height: 100%;
	border-radius: ${(props) => props.theme.shape.borderRadius};
`;

const CompanyLogo: React.FC<JSX.IntrinsicElements['img']> = (props) => {
	return (
		<CompanyLogoContainer>
			<CompanyLogoImg {...props} />
		</CompanyLogoContainer>
	);
};

export default CompanyLogo;
