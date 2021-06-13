import Switch from '@material-ui/core/Switch';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ThemeMode, themeModeAtom } from 'store/general';

const ThemeSwitch: React.FC = () => {
	const [theme, setTheme] = useRecoilState(themeModeAtom);

	const handleThemeChange = () => setTheme(theme == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);

	return (
		<Switch
			checked={theme == ThemeMode.DARK}
			onChange={handleThemeChange}
			inputProps={{ 'aria-label': 'controlled' }}
		/>
	);
};

export default ThemeSwitch;
