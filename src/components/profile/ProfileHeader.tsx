import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Center from 'components/layout/Center';
import React from 'react';
import { useRecoilValue } from 'recoil';
import firebaseStorageQuery from 'store/general/firebaseStorageQuery';
import HeaderPlaceholder from 'assets/HeaderPlaceholder.svg';

const ProfileHeaderContainer = styled('div')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
`;

const EditButton = styled(Button)`
	padding: 0;
	min-width: unset;
	width: 100%;
	height: 100%;
	border-radius: 0;
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
`;

const ProfileHeaderImg = styled('img')`
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	object-fit: cover;
	object-position: center;
`;

export interface ProfileHeaderProps {
	src: string;
	width?: string | number;
	height?: string | number;
	onImageChange?: React.ChangeEventHandler<HTMLInputElement>;
	disableFirebase?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ src, width, height, onImageChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	const image = (
		<ProfileHeaderImg src={src.length === 0 ? HeaderPlaceholder : src} alt={''} width={width} height={height} />
	);

	if (onImageChange !== undefined) {
		return (
			<>
				<Tooltip title="Header bearbeiten">
					<EditButton onClick={handleEdit}>{image}</EditButton>
				</Tooltip>
				<input
					ref={inputRef}
					type="file"
					id="profile"
					name="profile"
					style={{ display: 'none' }}
					accept="image/*"
					onChange={onImageChange}
				/>
			</>
		);
	}

	return image;
};

const ProfileHeaderFirebaseProxy: React.FC<ProfileHeaderProps> = (props) => {
	const url = useRecoilValue(firebaseStorageQuery(props.src));
	return <ProfileHeader {...props} src={url ?? ''} />;
};

const AsyncProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
	return (
		<ProfileHeaderContainer>
			<React.Suspense
				fallback={
					<Center>
						<CircularProgress />
					</Center>
				}
			>
				{props.disableFirebase || props.src.length === 0 ? (
					<ProfileHeader {...props} />
				) : (
					<ProfileHeaderFirebaseProxy {...props} />
				)}
			</React.Suspense>
		</ProfileHeaderContainer>
	);
};

export default AsyncProfileHeader;
