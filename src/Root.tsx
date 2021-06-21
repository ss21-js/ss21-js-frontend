import * as React from 'react';
import { RecoilRoot } from 'recoil';
import RootRouter from './RootRouter';
import ThemeWrapper from './Theme';

const Root: React.FC = () => {
	return (
		<RecoilRoot>
			<ThemeWrapper>
				<RootRouter />
			</ThemeWrapper>
		</RecoilRoot>
	);
};
export default Root;
