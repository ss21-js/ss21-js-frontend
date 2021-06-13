import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabContent } from 'models/tab';
import React, { useState } from 'react';
import TabContentPanel from './TabContentPanel';

interface TabProps {
	tab: TabContent[];
}

const TabBar: React.FC<TabProps> = ({ tab }) => {
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
					margin-bottom: 2rem;
					background-color: ${theme.palette.primary.contrastText};
				`}
			>
				{tab.map((TabContent, index) => (
					<Tab
						key={index}
						label={TabContent.tabTitle}
						{...Props(index)}
						css={css`
							font-weight: bold;
						`}
					/>
				))}
			</Tabs>
			{tab.map((TabContent, index) => (
				<TabContentPanel key={index} value={value} index={index}>
					{TabContent.tabContent}
				</TabContentPanel>
			))}
		</>
	);
};

export default TabBar;
