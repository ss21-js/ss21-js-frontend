import React from 'react';
import Container from '@material-ui/core/Container/Container';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import StyledIconButton from '../../../components/app/StyledIconButton';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import Box from '@material-ui/core/Box';
import { faShareSquare } from '@fortawesome/free-regular-svg-icons';
import placeholder from 'src/assets/HeaderPicture.jpeg';

const HeaderImage = styled('img')`
	border-top-left-radius: ${(props) => props.theme.shape.borderRadius};
	border-top-right-radius: ${(props) => props.theme.shape.borderRadius};
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const CompanyLogoContainer = styled('div')`
	position: absolute;
	left: 6%;
	bottom: -64px;
	transform: translate(-50% -50%);
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 180px;
	height: 180px;
	padding: 8px;
`;

const CompanyLogo = styled('img')`
	width: 100%;
	height: 100%;
	border-radius: ${(props) => props.theme.shape.borderRadius};
`;
const Header = styled('div')`
	position: relative;
	width: 100%;
	height: 150px;
`;
const ButtonRow = styled('div')`
	display: flex;
	justify-content: flex-end;
	margin: ${(props) => props.theme.spacing(2)};
`;

const ProfileHeaderSection: React.FC = () => {
	const handleSave = () => {
		//
	};

	const handleShare = () => {
		//
	};
	return (
		<Container>
			<Header>
				<HeaderImage
					src={
						'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
					}
				/>
				<CompanyLogoContainer>
					<CompanyLogo src={placeholder} />
				</CompanyLogoContainer>
			</Header>
			<ButtonRow>
				<StyledIconButton icon={faGithub} onClick={handleSave} />
				<Box width={16} />
				<StyledIconButton icon={faShareSquare} onClick={handleShare} />
			</ButtonRow>
		</Container>
	);
};

export default ProfileHeaderSection;
