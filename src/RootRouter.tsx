import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import FirebaseWrapper from './components/FirebaseWrapper';
import FullScreenLoading from './components/FullScreenLoading';
import FullSizeContainer from './components/layout/FullSizeContainer';
import router from './Router';

const RootRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<FullSizeContainer>
				<FirebaseWrapper>
					<React.Suspense fallback={<FullScreenLoading />}>
						<RouterSwitch router={router} />
					</React.Suspense>
				</FirebaseWrapper>
			</FullSizeContainer>
		</BrowserRouter>
	);
};

export default RootRouter;
