import * as React from 'react';
import { Toaster } from 'react-hot-toast';
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
						<Toaster
							position="top-right"
							reverseOrder={false}
							containerStyle={{
								marginTop: 64,
							}}
						/>
					</React.Suspense>
				</FirebaseWrapper>
			</FullSizeContainer>
		</BrowserRouter>
	);
};

export default RootRouter;
