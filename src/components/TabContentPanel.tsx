import styled from '@emotion/styled';
import { Box } from '@material-ui/core';

interface TabPanelProps {
	children: React.ReactNode;
	index: any;
	value: any;
}

const Container = styled.div`
	background-color: white;
	border-radius: 0.6rem;
`;

const TabContentPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
	return (
		<Container
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Container>
	);
};

export default TabContentPanel;
