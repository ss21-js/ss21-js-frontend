import { joiResolver } from '@hookform/resolvers/joi';
import { Apple, Github, Google, Microsoft } from '@icons-pack/react-simple-icons';
import { makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import Link from '@material-ui/core/Link/Link';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import Joi from 'joi';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fromRoot } from 'src/store';
import { signIn, signInWith } from 'src/store/auth/auth.actions';
import { OAuthProvider, SignInWithEmail } from 'src/store/auth/auth.model';

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

const loginSchema = Joi.object<SignInWithEmail>({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).max(32).required(),
});

const LoginPage: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const authError = useSelector(fromRoot.authError);
	const authLoading = useSelector(fromRoot.authLoading);

	// Will get fixed in new release of react-hook-form
	// See: https://github.com/react-hook-form/react-hook-form/issues/2887
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { register, handleSubmit, errors } = useForm<SignInWithEmail>({
		resolver: joiResolver(loginSchema),
	});

	const onSubmit = (data: SignInWithEmail) => {
		dispatch(signIn.request(data));
	};

	const handleGoogle = () => dispatch(signInWith.request(OAuthProvider.google));
	const handleApple = () => dispatch(signInWith.request(OAuthProvider.apple));
	const handleMicrosoft = () => dispatch(signInWith.request(OAuthProvider.microsoft));
	const handleGithub = () => dispatch(signInWith.request(OAuthProvider.github));

	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Login
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
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
					<TextField
						inputRef={register}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						disabled={authLoading}
						error={errors.email?.message !== undefined}
						helperText={errors.email?.message}
					/>
					<TextField
						inputRef={register}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						disabled={authLoading}
						error={errors.password?.message !== undefined}
						helperText={errors.password?.message}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={authLoading}
					>
						Sign In
					</Button>
					{authError && (
						<Typography variant="body1" color="error" gutterBottom>
							{authError}
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
