import { css } from '@emotion/react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

export interface TabBarProps {
	tabs: string[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Tabs
			value={value}
			onChange={handleChange}
			variant="fullWidth"
			textColor="primary"
			css={css`
				box-shadow: 1px 1px 10px lightgrey;
				border-radius: 0.6rem;
			`}
		>
			{tabs.map((tab) => (
				<Tab
					label={tab}
					css={css`
						font-weight: bold;
					`}
				/>
			))}
		</Tabs>
	);
};
export default TabBar;
