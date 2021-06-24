import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Center from 'components/layout/Center';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { firebaseImage } from 'store/user';

const CompanyHeaderContainer = styled('div')`
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

const CompanyHeaderImg = styled('img')`
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	object-fit: cover;
	object-position: center;
`;

export interface CompanyHeaderProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	onImageChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ src, alt, width, height, onImageChange }) => {
	const url = useRecoilValue(firebaseImage(src));
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	if (onImageChange !== undefined) {
		return (
			<>
				<Tooltip title="Header bearbeiten">
					<EditButton onClick={handleEdit}>
						<CompanyHeaderImg src={url} alt={alt} width={width} height={height} />
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

	return <CompanyHeaderImg src={url} alt={alt} width={width} height={height} />;
};

const AsyncCompanyHeader: React.FC<CompanyHeaderProps> = (props) => {
	return (
		<CompanyHeaderContainer>
			<React.Suspense
				fallback={
					<Center>
						<CircularProgress />
					</Center>
				}
			>
				<CompanyHeader {...props} />
			</React.Suspense>
		</CompanyHeaderContainer>
	);
};

export default AsyncCompanyHeader;
