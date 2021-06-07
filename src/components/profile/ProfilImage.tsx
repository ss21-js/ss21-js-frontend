import styled from '@emotion/styled';
import React, { useState } from 'react';
import placeholder from 'src/assets/HeaderPicture.jpeg';
import RoundedImage from 'src/components/RoundedImage';

const Image = styled(RoundedImage)`
	margin-top: 20px;
	@media (min-width: 500px) {
		margin-right: 70px;
		margin-top: 0;
	}
	border-radius: 4.6rem;
`;

const ProfilImage: React.FC = () => {
	const [{ alt, src }, setImg] = useState({
		src: placeholder,
		alt: 'Upload an Image',
	});

	const handleImg = (e: any) => {
		if (e.target.files[0]) {
			setImg({
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
			});
		}
	};

	return (
		<label>
			<Image src={src} alt={alt} width="150px" height="150px" />
			<input
				type="file"
				id="file1"
				name="file1"
				style={{ display: 'none' }}
				accept="image/*"
				onChange={handleImg}
			/>
		</label>
	);
};

export default ProfilImage;
