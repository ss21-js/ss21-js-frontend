import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Skeleton, Typography, useTheme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Company, Student } from 'js-api-client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUser } from 'store/user';

export interface CurrentUserProps {
	avatarOnly?: boolean;
}

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const AsyncCurrentUser: React.FC<CurrentUserProps> = ({ avatarOnly }) => {
	const theme = useTheme();
	const user = useRecoilValue(currentUser);

	if (user === null) {
		return <CurrentUserSkeleton />;
	}

	var initials = '??';
	var name = 'Fehler';

	if (user.userType === 'student') {
		const student = user.userData as Student;
		initials = `${student.firstName.substring(0, 1)}${student.lastName.substring(0, 1)}`;
		name = `${student.firstName} ${student.lastName}`;
	}

	if (user.userType === 'company') {
		const company = user.userData as Company;
		initials = company.name.substring(0, 2);
		name = company.name;
	}

	return (
		<Row>
			<Avatar>{initials}</Avatar>
			{!avatarOnly && (
				<Typography
					variant="body1"
					css={css`
						color: ${theme.palette.secondary.contrastText};
						margin-left: 0.75rem;
					`}
				>
					{name}
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
