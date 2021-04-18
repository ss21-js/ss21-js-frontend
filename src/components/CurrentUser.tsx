import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Skeleton, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUser } from 'src/store/user';

export interface CurrentUserProps {
	avatarOnly?: boolean;
}

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const AsyncCurrentUser: React.FC<CurrentUserProps> = ({ avatarOnly }) => {
	const user = useRecoilValue(currentUser);

	return (
		<Row>
			<Avatar>
				{user.firstname.substring(0, 1)}
				{user.lastname.substring(0, 1)}
			</Avatar>
			{!avatarOnly && (
				<Typography
					variant="body1"
					css={css`
						color: #333;
						margin-left: 0.75rem;
					`}
				>
					{user.firstname} {user.lastname}
				</Typography>
			)}
		</Row>
	);
};

const CurrentUserSkeleton: React.FC = () => {
	return (
		<Row>
			<Skeleton animation="wave" variant="circular" width={32} height={32} />
			<Skeleton
				animation="wave"
				variant="text"
				width={120}
				css={css`
					margin-left: 0.75rem;
				`}
			/>
		</Row>
	);
};

const CurrentUser: React.FC<CurrentUserProps> = (props) => {
	return (
		<React.Suspense fallback={<CurrentUserSkeleton />}>
			<AsyncCurrentUser {...props} />
		</React.Suspense>
	);
};

export default CurrentUser;
