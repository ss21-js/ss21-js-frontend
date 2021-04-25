import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

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
      >
			{tabs.map((tab) => (
                <Tab label={tab}/>
			))}
      </Tabs>
	);
};
export default TabBar;