import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import ProfilePlaceholder from 'assets/ProfilePlaceholder.jpeg';
import Center from 'components/layout/Center';
import React from 'react';
import { useRecoilValue } from 'recoil';
import firebaseStorageQuery from 'store/general/firebaseStorageQuery';

const ProfileLogoContainer = styled('div')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 128px;
	height: 128px;
	padding: 8px;
`;

const ProfileLogoImg = styled('img')`
	width: 100%;
	height: 100%;
	border-radius: ${(props) => props.theme.shape.borderRadius};
	object-fit: cover;
	object-position: center;
`;

const EditButton = styled(Button)`
	padding: 0;
	min-width: unset;
	width: 100%;
	height: 100%;
	border-radius: 0;
`;

interface ProfileLogoProps {
	src: string;
	width?: string | number;
	height?: string | number;
	onImageChange?: React.ChangeEventHandler<HTMLInputElement>;
	disableFirebase?: boolean;
}

const ProfileLogo: React.FC<ProfileLogoProps> = ({ src, width, height, onImageChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	const image = (
		<ProfileLogoImg src={src.length === 0 ? ProfilePlaceholder : src} alt={''} width={width} height={height} />
	);

	if (onImageChange !== undefined) {
		return (
			<>
				<Tooltip title="Profilbild bearbeiten">
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

const ProfileLogoFirebaseProxy: React.FC<ProfileLogoProps> = (props) => {
	const url = useRecoilValue(firebaseStorageQuery(props.src));
	return <ProfileLogo {...props} src={url ?? ''} />;
};

const AsyncProfileLogo: React.FC<ProfileLogoProps> = (props) => {
	return (
		<ProfileLogoContainer
			sx={{
				width: props.width,
				height: props.height,
			}}
		>
			<React.Suspense
				fallback={
					<Center>
						<CircularProgress />
					</Center>
				}
			>
				{props.disableFirebase || props.src.length === 0 ? (
					<ProfileLogo {...props} />
				) : (
					<ProfileLogoFirebaseProxy {...props} />
				)}
			</React.Suspense>
		</ProfileLogoContainer>
	);
};

export default AsyncProfileLogo;
