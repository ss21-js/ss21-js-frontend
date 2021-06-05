import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import InfoAlert from 'src/components/app/InfoAlert';
import TextFieldContainer from 'src/components/TextField';

const AboutUsCompany: React.FC = () => {
	return (
		<>
			<InfoAlert />
			<form>
				<TextFieldContainer id="company" label="Firma" defaultValue="BMW Group GmbH" />
				<TextFieldContainer id="homepage" label="Homepage" defaultValue="www.bmw-group.de" />
				<TextFieldContainer id="email" label="E-Mailadresse" defaultValue="info@bmw-group.de" />
				<TextFieldContainer id="location" label="Standort" defaultValue="München" />
				<Typography
					variant="h6"
					css={css`
						margin-top: 5px;
						font-weight: 500;
					`}
				>
					Adresse:
				</Typography>
				<TextFieldContainer id="street1" label="Straße" defaultValue="Münchnerstr." />
				<TextFieldContainer id="street2" label="zusätzliche Straße" defaultValue="" />
				<TextFieldContainer id="zip" label="PLZ" defaultValue="84957" />
				<TextFieldContainer id="city" label="Stadt" defaultValue="München" />
				<TextFieldContainer id="country" label="Land" defaultValue="Deutschland" />
				<TextFieldContainer id="state" label="Staat" defaultValue="" />
			</form>
		</>
	);
};

export default AboutUsCompany;
