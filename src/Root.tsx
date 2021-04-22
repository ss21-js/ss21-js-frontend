import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import { RecoilRoot } from 'recoil';
import FullSizeContainer from './components/layout/FullSizeContainer';
import FirebaseWrapper from './firebase/FirebaseWrapper';
import router from './Router';
import ThemeWrapper from './Theme';

const Root: React.FC = () => {
	return (
		<RecoilRoot>
			<ThemeWrapper>
				<BrowserRouter>
					<FullSizeContainer>
						<FirebaseWrapper>
							<RouterSwitch router={router} />
						</FirebaseWrapper>
					</FullSizeContainer>
				</BrowserRouter>
			</ThemeWrapper>
		</RecoilRoot>
	);
};
export default Root;
