import CircularProgress from '@material-ui/core/CircularProgress';
import Center from 'components/layout/Center';
import React from 'react';

const FullScreenLoading: React.FC = () => {
	return (
		<Center>
			<CircularProgress />
		</Center>
	);
};

export default FullScreenLoading;
