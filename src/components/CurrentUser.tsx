import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/core/Skeleton';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import { Company, Student } from 'js-api-client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserAtom, currentUserTypeAtom, UserType } from 'store/user';

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
	const user = useRecoilValue(currentUserAtom);
	const userType = useRecoilValue(currentUserTypeAtom);

	if (user === null || userType === null) {
		return <CurrentUserSkeleton />;
	}

	var initials = '??';
	var name = 'Fehler';

	if (userType === UserType.STUDENT) {
		const student = user as Student;
		initials = `${student.firstName.substring(0, 1)}${student.lastName.substring(0, 1)}`;
		name = `${student.firstName} ${student.lastName}`;
	}

	if (userType === UserType.COMPANY) {
		const company = user as Company;
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
