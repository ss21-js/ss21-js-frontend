import Box from '@material-ui/core/Box';

interface TabPanelProps {
	children: React.ReactNode;
	index: unknown;
	value: unknown;
}

const TabContentPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

export default TabContentPanel;
