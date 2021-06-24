import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Center from 'components/layout/Center';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { firebaseImage } from 'store/user';

const CompanyLogoContainer = styled('div')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 128px;
	height: 128px;
	padding: 8px;
`;

const CompanyLogoImg = styled('img')`
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

interface CompanyLogoProps {
	src: string;
	width?: string | number;
	height?: string | number;
	onImageChange?: React.ChangeEventHandler<HTMLInputElement>;
	disableFirebase?: boolean;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ src, width, height, onImageChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	if (onImageChange !== undefined) {
		return (
			<>
				<Tooltip title="Profilbild bearbeiten">
					<EditButton onClick={handleEdit}>
						<CompanyLogoImg src={src} alt={''} width={width} height={height} />
					</EditButton>
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

	return <CompanyLogoImg src={src} alt={''} width={width} height={height} />;
};

const CompanyLogoFirebaseProxy: React.FC<CompanyLogoProps> = (props) => {
	const url = useRecoilValue(firebaseImage(props.src));
	return <CompanyLogo {...props} src={url ?? ''} />;
};

const AsyncCompanyLogo: React.FC<CompanyLogoProps> = (props) => {
	return (
		<CompanyLogoContainer
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
				{props.disableFirebase ? <CompanyLogo {...props} /> : <CompanyLogoFirebaseProxy {...props} />}
			</React.Suspense>
		</CompanyLogoContainer>
	);
};

export default AsyncCompanyLogo;
