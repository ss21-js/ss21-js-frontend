import { css } from '@emotion/react';
import useTheme from '@material-ui/core/styles/useTheme';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import TabContentPanel from './TabContentPanel';

export interface TabBarTab {
	title: string;
	component: React.ReactNode;
}

interface TabProps {
	tabs: TabBarTab[];
}

const TabBar: React.FC<TabProps> = ({ tabs }) => {
	const theme = useTheme();
	const initialTabIndex = 0;
	const [value, setValue] = useState(initialTabIndex);

	const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	function Props(index: any) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	return (
		<>
			<Tabs
				TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				aria-label=""
				textColor="primary"
				css={css`
					box-shadow: 1px 1px 5px lightgrey;
					border-radius: 0.6rem;
					background-color: ${theme.palette.primary.contrastText};
				`}
			>
				{tabs.map((TabContent, index) => (
					<Tab
						key={index}
						label={TabContent.title}
						{...Props(index)}
						css={css`
							font-weight: bold;
						`}
					/>
				))}
			</Tabs>
			{tabs.map((TabContent, index) => (
				<TabContentPanel key={index} value={value} index={index}>
					{TabContent.component}
				</TabContentPanel>
			))}
		</>
	);
};

export default TabBar;
