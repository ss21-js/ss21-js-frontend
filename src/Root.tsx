import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import { RecoilRoot } from 'recoil';
import FirebaseWrapper from './components/FirebaseWrapper';
import FullScreenLoading from './components/FullScreenLoading';
import FullSizeContainer from './components/layout/FullSizeContainer';
import router from './Router';
import ThemeWrapper from './Theme';

const Root: React.FC = () => {
	return (
		<RecoilRoot>
			<ThemeWrapper>
				<BrowserRouter>
					<FullSizeContainer>
						<FirebaseWrapper>
							<React.Suspense fallback={<FullScreenLoading />}>
								<RouterSwitch router={router} />
							</React.Suspense>
						</FirebaseWrapper>
					</FullSizeContainer>
				</BrowserRouter>
			</ThemeWrapper>
		</RecoilRoot>
	);
};
export default Root;
