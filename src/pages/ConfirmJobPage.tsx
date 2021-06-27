import AppFrame from 'components/app/AppFrame';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useAcceptJob from 'store/jobs/useAcceptJob';
import RoundedBox from 'components/RoundedBox';
import Typography from '@material-ui/core/Typography/Typography';
import { useRouteParams } from 'react-typesafe-routes';
import router from '../Router';
import { CircularProgress } from '@material-ui/core';
import CenterContainer from 'components/layout/CenterContainer';
import Scrollable from 'components/app/Scrollable';
import JobDetailsCard from 'components/jobs/JobDetailsCard/JobDetailsCard';

const ConfirmJobPage = () => {
	const { jobId } = useRouteParams(router.app.children.confirmJob);

	const acceptJob = useAcceptJob();

	const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');

	useEffect(() => {
		if (!jobId) {
			setState('error');
			return;
		}

		acceptJob!(jobId)
			.then(() => {
				setState('success');
			})
			.catch(() => {
				setState('error');
			});
	}, []);

	return (
		<AppFrame>
			<Scrollable>
				<CenterContainer maxWidth={'lg'}>
					{state === 'success' && (
						<>
							<RoundedBox padding={3} marginBottom={3}>
								<Typography component="h1" variant="h5" gutterBottom>
									Herzlichen Glückwunsch, Sie haben den Job!
								</Typography>
							</RoundedBox>
							<JobDetailsCard jobId={jobId} />
						</>
					)}
					{state === 'error' && (
						<RoundedBox padding={3}>
							<Typography component="h1" variant="h5" gutterBottom>
								Die Anfrage konnte nicht verarbeitet werden
							</Typography>
						</RoundedBox>
					)}
					{state === 'loading' && (
						<RoundedBox padding={3}>
							<CircularProgress />
						</RoundedBox>
					)}
				</CenterContainer>
			</Scrollable>
		</AppFrame>
	);
};

export default ConfirmJobPage;
