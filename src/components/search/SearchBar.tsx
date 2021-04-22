import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ThemeMode, themeMode } from 'src/store/general';
import RoundedBox from '../RoundedBox';

export interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
	const [theme, setTheme] = useRecoilState(themeMode);

	const handleThemeChange = () => setTheme(theme == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);

	return (
		<RoundedBox padding={3}>
			<Typography variant="h6">Search...</Typography>
			<Switch
				checked={theme == ThemeMode.DARK}
				onChange={handleThemeChange}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
		</RoundedBox>
	);
};

export default SearchBar;
