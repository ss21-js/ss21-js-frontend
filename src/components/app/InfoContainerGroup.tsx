import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	border: {
		alignSelf: 'center',
		border: 'solid gray 1px',
		borderRadius: '0.6rem',
		margin: theme.spacing(0, 15, 0, 15),
	},
	titel: {
		textTransform: 'uppercase',
		color: 'gray',
		fontSize: '0.8rem',
	},
	data: {
		fontWeight: 500,
	},
	item: {
		margin: theme.spacing(1, 0, 1, 0),
		minWidth: '120px',
	},
}));

const InfoContainerGroup: React.FC = () => {
	const classes = useStyles();
	const job = {
		erfahrung: 'Mind. 1 Jahr',
		dauer: '4 Wochen',
		beschaeftigung: 'Vollzeitjob',
		gehalt: '1200,00 €',
	};
	return (
		<Container className={classes.border}>
			<div>
				<Grid container justifyContent="space-evenly">
					<Grid item className={classes.item}>
						<Typography className={classes.titel}>Erfahrung</Typography>
						<Typography className={classes.data}>{job.erfahrung}</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography className={classes.titel}>Dauer</Typography>
						<Typography className={classes.data}>{job.dauer}</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography className={classes.titel}>Beschäftigung</Typography>
						<Typography className={classes.data}>{job.beschaeftigung}</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography className={classes.titel}>Gehalt</Typography>
						<Typography className={classes.data}>{job.gehalt}</Typography>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default InfoContainerGroup;
