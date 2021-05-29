import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import Container from '@material-ui/core/Container/Container';

import styled from '@emotion/styled';
import StyledButton from '../StyledButton';
import { css } from '@emotion/react';

export interface Icon {
	title: string;
	icon: IconDefinition;
	color: string;
}

export interface IconBarProps {
	icons: Icon[];
}

const IconButton = styled(StyledButton)`
	padding: 0.5rem;
	min-width: unset;
	width: 42px;
	height: 42px;
`;

const IconBar: React.FC<IconBarProps> = ({icons}) => {

	return (
		<Container component="main"
				   maxWidth="xs"
				   css={css`
					align-self: center;
				  `}
		>
			<Grid container
				  justifyContent="space-evenly"
				  css={css`
					margin: 3px 0px 0px 0px;
				  `}
			>
				{icons.map((icon) => (
					<Grid item>
						<Tooltip title={icon.title}>
							<span>
								<IconButton css={css`
											background-color: ${icon.color};
											`}
								>
									<FontAwesomeIcon icon={icon.icon} size="lg" />
								</IconButton>
							</span>
						</Tooltip>
					</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default IconBar;
