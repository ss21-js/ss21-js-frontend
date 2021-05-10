import React from 'react';
import AppFrame from 'src/components/app/AppFrame';
import Center from 'src/components/layout/Center';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles, Theme } from '@material-ui/core';
import StyledIconButton from '../components/app/StyledIconButton';

const IconButton = styled(StyledIconButton)`
	padding: 0.5rem;
  border-radius: 25px;
	min-width: unset;
	width: 42px;
	height: 42px;
`;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		alignSelf: 'center',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	social: {
		margin: theme.spacing(3, 0, 0, 0),
	},
}));

const StudentenProfil: React.FC = () => {
	const classes = useStyles();

	function handleClick() {
		console.log('Click happened');
	}

	return (
		<AppFrame>
			<Center>
				<Grid container justifyContent={'center'} spacing={1} className={classes.social}>
					<Grid item>
						<Tooltip title="Visit on Facebook">
							<span>
								<IconButton icon={faLinkedin} onClick={handleClick}/>
							</span>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip title="Sign in with Apple">
							<span>
								<IconButton icon={faLinkedin} onClick={handleClick}/>
							</span>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip title="Sign in with Microsoft">
							<span>
								<IconButton icon={faLinkedin} onClick={handleClick}/>
							</span>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip title="Sign in with Github">
							<span>
								<IconButton icon={faLinkedin} onClick={handleClick}/>
							</span>
						</Tooltip>
					</Grid>
				</Grid>
			</Center>
		</AppFrame>
	);
};

export default StudentenProfil;
