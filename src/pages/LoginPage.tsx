import { faApple, faGithub, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid/Grid';
import Link from '@material-ui/core/Link/Link';
import styled from '@material-ui/core/styles/styled';
import TextField from '@material-ui/core/TextField/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography/Typography';
import useMaterialRegister from 'common/useMaterialRegister';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import Joi from 'joi';
import { germanJoiMessages } from 'models/joiSchemas';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import router from 'Router';
import authState from 'store/auth/authState';
import EmailPassword from 'store/auth/emailPassword';
import useSignIn from 'store/auth/useSignIn';
import useSignInWith, { SignInWithProvider } from 'store/auth/useSignUpWith';

const Form = styled('form')`
	width: 100%;
	margin-top: ${(props) => props.theme.spacing(1)};
`;

const IconButton = styled(StyledButton)`
	padding: 0.5rem;
	min-width: unset;
	width: 42px;
	height: 42px;
`;

const loginSchema = Joi.object<EmailPassword>({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.label('Email'),
	password: Joi.string().min(6).max(32).required().label('Passwort'),
}).messages(germanJoiMessages);

const LoginPage: React.FC = () => {
	const { loading, error } = useRecoilValue(authState);

	const signIn = useSignIn();
	const signInWith = useSignInWith();

	const { control, handleSubmit } = useForm<EmailPassword>({
		resolver: joiResolver(loginSchema),
	});

	const onSubmit = (data: EmailPassword) => signIn(data);

	const handleGoogle = () => signInWith(SignInWithProvider.Google);
	const handleApple = () => signInWith(SignInWithProvider.Apple);
	const handleMicrosoft = () => signInWith(SignInWithProvider.Microsoft);
	const handleGithub = () => signInWith(SignInWithProvider.Github);

	const emailField = useMaterialRegister(control, 'email');
	const passwordField = useMaterialRegister(control, 'password');

	return (
		<Scrollable>
			<CenterContainer maxWidth="sm">
				<RoundedBox padding={3}>
					<Typography component="h1" variant="h5" gutterBottom>
						Login
					</Typography>
					<Grid container justifyContent="space-evenly" margin={[3, 0, 0, 0]}>
						<Grid item>
							<Tooltip title="Weiter mit Google">
								<span>
									<IconButton style={{ backgroundColor: '#4285F4' }} onClick={handleGoogle}>
										<FontAwesomeIcon icon={faGoogle} size="lg" />
									</IconButton>
								</span>
							</Tooltip>
						</Grid>
						<Grid item>
							<Tooltip title="Weiter mit Apple">
								<span>
									<IconButton style={{ backgroundColor: '#000' }} onClick={handleApple}>
										<FontAwesomeIcon icon={faApple} size="lg" />
									</IconButton>
								</span>
							</Tooltip>
						</Grid>
						<Grid item>
							<Tooltip title="Weiter mit Microsoft">
								<span>
									<IconButton style={{ backgroundColor: '#00A4EF' }} onClick={handleMicrosoft}>
										<FontAwesomeIcon icon={faMicrosoft} size="lg" />
									</IconButton>
								</span>
							</Tooltip>
						</Grid>
						<Grid item>
							<Tooltip title="Weiter mit Github">
								<span>
									<IconButton style={{ backgroundColor: '#333333' }} onClick={handleGithub}>
										<FontAwesomeIcon icon={faGithub} size="lg" />
									</IconButton>
								</span>
							</Tooltip>
						</Grid>
					</Grid>
					<Form onSubmit={handleSubmit(onSubmit)} noValidate>
						<TextField
							{...emailField}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Adresse"
							autoComplete="email"
							autoFocus
							disabled={loading}
						/>
						<TextField
							{...passwordField}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Passwort"
							type="password"
							id="password"
							autoComplete="current-password"
							disabled={loading}
						/>
						<Box marginY={2}>
							<StyledButton
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={loading}
							>
								Login
							</StyledButton>
						</Box>
						{error && (
							<Typography variant="body1" color="error" gutterBottom>
								{error}
							</Typography>
						)}
						<Grid container>
							{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
							<Grid item>
								<Link component={RouterLink} to={router.register()} variant="body2">
									Noch kein Konto? Account erstellen
								</Link>
							</Grid>
						</Grid>
					</Form>
				</RoundedBox>
			</CenterContainer>
		</Scrollable>
	);
};

export default LoginPage;
