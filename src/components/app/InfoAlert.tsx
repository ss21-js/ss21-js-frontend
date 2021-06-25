import styled from '@emotion/styled';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '@material-ui/core/Alert/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

const Container = styled.div`
	background-color: white;
	border-radius: 0.6rem;
`;

const InfoAlert: React.FC = () => {
	const [open, setOpen] = React.useState(true);
	return (
		<Container>
			<Collapse in={open}>
				<Alert
					severity="info"
					onClose={() => {
						setOpen(false);
					}}
				>
					Mit einem Doppelklick auf ein Feld können Sie Ihre Daten bearbeiten.
				</Alert>
			</Collapse>
			<IconButton
				color="primary"
				disabled={open}
				onClick={() => {
					setOpen(true);
				}}
			>
				<FontAwesomeIcon icon={faInfoCircle} size={'sm'} />
			</IconButton>
		</Container>
	);
};

export default InfoAlert;
