import styled from '@material-ui/core/styles/styled';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileLogo from './ProfileLogo';

const ImageContainer = styled('div')`
	position: relative;
	margin: -${(props) => props.theme.spacing(4)};
	border-top-left-radius: ${(props) => props.theme.shape.borderRadius};
	border-top-right-radius: ${(props) => props.theme.shape.borderRadius};
	margin-bottom: 96px;

	${(props) => props.theme.breakpoints.down('sm')} {
		margin-bottom: 64px;
	}
`;

const ProfileLogoContainer = styled('div')`
	position: absolute;
	left: max(6%, 48px);
	bottom: -96px;
	transform: translate(-50% -50%);

	${(props) => props.theme.breakpoints.down('sm')} {
		bottom: -64px;
	}
`;

const InfoComponentWrapper = styled('div')`
	position: absolute;
	left: calc(6% + 192px + 2%);
	right: max(2%, 48px);
	bottom: -96px;

	${(props) => props.theme.breakpoints.down('sm')} {
		left: calc(6% + 128px + 2%);
		bottom: -64px;
	}
`;

const StyledProfileLogo = styled(ProfileLogo)`
	width: 192px;
	height: 192px;

	${(props) => props.theme.breakpoints.down('sm')} {
		width: 128px;
		height: 128px;
	}
`;

export type ProfileImagesProps = {
	headerImageUrl?: string;
	headerImageChanged?: (file: File, url: string) => void;
	profileImageUrl?: string;
	profileImageChanged?: (file: File, url: string) => void;
	infoComponent?: React.ReactNode;
	disableFirebase?: boolean;
};

const ProfileImages: React.FC<ProfileImagesProps> = ({
	headerImageUrl,
	headerImageChanged,
	profileImageUrl,
	profileImageChanged,
	infoComponent,
	disableFirebase,
}) => {
	const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const url = URL.createObjectURL(e.target.files[0]);
			headerImageChanged!(e.target.files[0], url);
		}
	};

	const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const url = URL.createObjectURL(e.target.files[0]);
			profileImageChanged!(e.target.files[0], url);
		}
	};

	return (
		<ImageContainer>
			<ProfileHeader
				src={headerImageUrl ?? ''}
				width="100%"
				height="250px"
				onImageChange={headerImageChanged ? handleHeader : undefined}
				disableFirebase={disableFirebase}
			/>
			<ProfileLogoContainer>
				<StyledProfileLogo
					src={profileImageUrl ?? ''}
					onImageChange={profileImageChanged ? handleProfile : undefined}
					disableFirebase={disableFirebase}
				/>
			</ProfileLogoContainer>
			{infoComponent && <InfoComponentWrapper>{infoComponent}</InfoComponentWrapper>}
		</ImageContainer>
	);
};

export default ProfileImages;
