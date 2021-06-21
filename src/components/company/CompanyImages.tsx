import { styled } from '@material-ui/core';
import HeaderPlaceholder from 'assets/HeaderPlaceholder.svg';
import React from 'react';
import CompanyHeader from './CompanyHeader';
import CompanyLogo from './CompanyLogo';

const ImageContainer = styled('div')<LargeLogoProps>`
	position: relative;
	margin: -${(props) => props.theme.spacing(4)};
	border-top-left-radius: ${(props) => props.theme.shape.borderRadius};
	border-top-right-radius: ${(props) => props.theme.shape.borderRadius};
	margin-bottom: ${(props) => (props.largeLogo ? '96px' : '64px')};
`;

const CompanyLogoContainer = styled('div')<LargeLogoProps>`
	position: absolute;
	left: max(6%, 48px);
	bottom: -${(props) => (props.largeLogo ? '96px' : '64px')};
	transform: translate(-50% -50%);
`;

const InfoComponentWrapper = styled('div')<LargeLogoProps>`
	position: absolute;
	left: calc(6% + ${(props) => (props.largeLogo ? '192px' : '128px')} + 2%);
	right: max(2%, 48px);
	bottom: -${(props) => (props.largeLogo ? '96px' : '64px')}x;
`;

interface LargeLogoProps {
	largeLogo?: boolean;
}

export type CompanyImagesProps = LargeLogoProps & {
	headerImageUrl?: string;
	headerImageChanged: (file: File, url: string) => void;
	profileImageUrl?: string;
	profileImageChanged: (file: File, url: string) => void;
	infoComponent?: React.ReactNode;
};

const CompanyImages: React.FC<CompanyImagesProps> = (props) => {
	const { headerImageUrl, headerImageChanged, profileImageUrl, profileImageChanged, infoComponent, largeLogo } =
		props;

	const [header, setHeader] = React.useState({
		src: headerImageUrl ?? HeaderPlaceholder,
		alt: 'Header auswählen',
	});

	const [profile, setProfile] = React.useState({
		src: profileImageUrl ?? HeaderPlaceholder,
		alt: 'Header auswählen',
	});

	const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const url = URL.createObjectURL(e.target.files[0]);
			headerImageChanged(e.target.files[0], url);
			setHeader({
				src: url,
				alt: e.target.files[0].name,
			});
		}
	};

	const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const url = URL.createObjectURL(e.target.files[0]);
			profileImageChanged(e.target.files[0], url);
			setProfile({
				src: url,
				alt: e.target.files[0].name,
			});
		}
	};

	return (
		<ImageContainer largeLogo={largeLogo}>
			<CompanyHeader src={header.src} alt={header.alt} width="100%" height="250px" onImageChange={handleHeader} />
			<CompanyLogoContainer largeLogo={largeLogo}>
				<CompanyLogo
					src={profile.src}
					alt={profile.alt}
					width={largeLogo ? 192 : 128}
					height={largeLogo ? 192 : 128}
					onImageChange={handleProfile}
				/>
			</CompanyLogoContainer>
			{infoComponent && <InfoComponentWrapper largeLogo={largeLogo}>{infoComponent}</InfoComponentWrapper>}
		</ImageContainer>
	);
};

export default CompanyImages;
