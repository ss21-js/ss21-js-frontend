import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import RootRouter from './RootRouter';
import ThemeWrapper from './Theme';

const Root: React.FC = () => {
	return (
		<RecoilRoot>
			<ThemeWrapper>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RootRouter />
				</LocalizationProvider>
			</ThemeWrapper>
		</RecoilRoot>
	);
};
export default Root;
