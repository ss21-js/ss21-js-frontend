import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import { useRecoilState } from 'recoil';
import { ThemeMode, themeModeAtom } from 'store/general';
import FirebaseWrapper from './components/FirebaseWrapper';
import FullScreenLoading from './components/FullScreenLoading';
import FullSizeContainer from './components/layout/FullSizeContainer';
import router from './Router';

const RootRouter: React.FC = () => {
	const [themeMode, setThemeMode] = useRecoilState(themeModeAtom);
	const handleThemeChange = () => setThemeMode(themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);

	return (
		<BrowserRouter>
			<FullSizeContainer>
				<FirebaseWrapper>
					<React.Suspense fallback={<FullScreenLoading />}>
						<RouterSwitch router={router} />
						<Fab
							color="primary"
							onClick={handleThemeChange}
							style={{ position: 'fixed', right: 32, bottom: 32 }}
						>
							<FontAwesomeIcon icon={themeMode === ThemeMode.DARK ? faSun : faMoon} />
						</Fab>
					</React.Suspense>
				</FirebaseWrapper>
			</FullSizeContainer>
		</BrowserRouter>
	);
};

export default RootRouter;
