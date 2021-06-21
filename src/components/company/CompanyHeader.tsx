import Button from '@material-ui/core/Button';
import styled from '@material-ui/core/styles/styled';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

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
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleEdit = () => {
		inputRef.current?.click();
	};

	return (
		<CompanyHeaderContainer>
			{onImageChange !== undefined ? (
				<>
					<Tooltip title="Header bearbeiten">
						<EditButton onClick={handleEdit}>
							<CompanyHeaderImg src={src} alt={alt} width={width} height={height} />
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
				<CompanyHeaderImg src={src} alt={alt} width={width} height={height} />
			)}
		</CompanyHeaderContainer>
	);
};

export default CompanyHeader;
