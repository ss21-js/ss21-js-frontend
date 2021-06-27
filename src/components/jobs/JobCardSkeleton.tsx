import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/core/Skeleton';
import RoundedBox from 'components/RoundedBox';
import React from 'react';

const JobCardSkeleton: React.FC = () => {
	return (
		<RoundedBox padding={3}>
			<RoundedBox width="72px" height="72px">
				<Skeleton animation="wave" variant="rectangular" width={72} height={72} />
			</RoundedBox>
			<Box marginTop={1} marginBottom={0.5}>
				<Skeleton animation="wave" variant="text" width="40%" />
			</Box>
			<Box marginBottom={2}>
				<Skeleton animation="wave" variant="text" width="100%" />
				<Skeleton animation="wave" variant="text" width="100%" />
				<Skeleton animation="wave" variant="text" width="80%" />
			</Box>
		</RoundedBox>
	);
};

export default JobCardSkeleton;
