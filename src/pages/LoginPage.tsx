import { Apple, Github, Google, Microsoft } from '@icons-pack/react-simple-icons';
import { makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Container from '@material-ui/core/Container/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Grid from '@material-ui/core/Grid/Grid';
import Link from '@material-ui/core/Link/Link';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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

const LoginPage: React.FC = () => {
	const classes = useStyles();

	const [error, setError] = React.useState('');

	const handleGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.catch((e: firebase.auth.AuthError) => setError(e.message));
	};
	const handleApple = () => {
		const provider = new firebase.auth.OAuthProvider('apple.com');
		provider.addScope('email');
		provider.addScope('name');
		firebase
			.auth()
			.signInWithPopup(provider)
			.catch((e: firebase.auth.AuthError) => setError(e.message));
	};
	const handleMicrosoft = () => {
		const provider = new firebase.auth.OAuthProvider('microsoft.com');
		provider.addScope('mail.read');
		firebase
			.auth()
			.signInWithPopup(provider)
			.catch((e: firebase.auth.AuthError) => setError(e.message));
	};
	const handleGithub = () => {
		const provider = new firebase.auth.GithubAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.catch((e: firebase.auth.AuthError) => setError(e.message));
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Grid container justify="space-evenly" className={classes.social}>
					<Grid item>
						<Button variant="contained" style={{ backgroundColor: '#4285F4' }} onClick={handleGoogle}>
							<Google color="#fff" fontSize="inherit" />
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" style={{ backgroundColor: '#000' }} onClick={handleApple}>
							<Apple color="#fff" fontSize="inherit" />
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" style={{ backgroundColor: '#00A4EF' }} onClick={handleMicrosoft}>
							<Microsoft color="#fff" fontSize="inherit" />
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" style={{ backgroundColor: '#333333' }} onClick={handleGithub}>
							<Github color="#fff" fontSize="inherit" />
						</Button>
					</Grid>
				</Grid>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign In
					</Button>
					{error && (
						<Typography variant="body1" color="error" gutterBottom>
							{error}
						</Typography>
					)}
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								Don&apos;t have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default LoginPage;
