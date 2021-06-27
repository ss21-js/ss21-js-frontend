import React from 'react';
import Container from '@material-ui/core/Container/Container';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const HeaderImage = styled('img')`
	border-top-left-radius: ${(props) => props.theme.shape.borderRadius};
	border-top-right-radius: ${(props) => props.theme.shape.borderRadius};
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const HeaderSection = styled('div')`
	position: relative;
	width: 100%;
	height: 250px;
`;

const Header: React.FC = () => {
	return (
		<Container>
			<HeaderSection>
				<HeaderImage
					src={
						'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
					}
				/>
			</HeaderSection>
		</Container>
	);
};

export default Header;
