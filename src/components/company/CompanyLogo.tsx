import Button from '@material-ui/core/Button';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

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
	alt: string;
	width?: string | number;
	height?: string | number;
	onImageChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ src, alt, width, height, onImageChange }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	return (
		<CompanyLogoContainer
			sx={{
				width: width,
				height: height,
			}}
		>
			{onImageChange !== undefined ? (
				<>
					<Tooltip title="Profilbild bearbeiten">
						<EditButton onClick={handleEdit}>
							<CompanyLogoImg src={src} alt={alt} width={width} height={height} />
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
			) : (
				<CompanyLogoImg src={src} alt={alt} width={width} height={height} />
			)}
		</CompanyLogoContainer>
	);
};

export default CompanyLogo;
