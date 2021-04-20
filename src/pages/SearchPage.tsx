import { Switch } from '@material-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import AppFrame from 'src/components/app/AppFrame';
import Center from 'src/components/layout/Center';
import RoundedBox from 'src/components/RoundedBox';
import { ThemeMode, themeMode } from 'src/store/general';

const SearchPage: React.FC = () => {
	const [theme, setTheme] = useRecoilState(themeMode);

	const handleThemeChange = () => setTheme(theme == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);

	return (
		<AppFrame>
			<Center>
				<Switch
					checked={theme == ThemeMode.DARK}
					onChange={handleThemeChange}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
				<RoundedBox>Text</RoundedBox>
			</Center>
		</AppFrame>
	);
};

export default SearchPage;
