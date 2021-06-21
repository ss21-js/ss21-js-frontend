import {
	AuthError,
	AuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	OAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { AuthApi, CompanyDto } from 'js-api-client';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { firebaseAuth } from '..';
import { authenticatedApiConfiguration } from './api';
import { currentUserAtom, currentUserTypeAtom, UserType } from './user';

export interface CurrentUser {
	id: string;
	idToken: string;
}

export const currentFirebaseUser = atom<CurrentUser | null>({
	key: 'currentFirebaseUser',
	default: null,
});

interface AuthState {
	loading: boolean;
	error: string | null;
}
export const authState = atom<AuthState>({
	key: 'authLoading',
	default: {
		loading: false,
		error: null,
	},
});

export interface SignInWithEmail {
	email: string;
	password: string;
}
export const useSignIn = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (arg: SignInWithEmail) => {
		setAuthState({
			loading: true,
			error: null,
		});

		signInWithEmailAndPassword(firebaseAuth, arg.email, arg.password)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export enum ThirdPartyAuthProvider {
	Google,
	Apple,
	Microsoft,
	Github,
}
export const useSignInWith = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (provider: ThirdPartyAuthProvider) => {
		setAuthState({
			loading: true,
			error: null,
		});

		let firebaseAuthProvider: AuthProvider;

		if (provider === ThirdPartyAuthProvider.Google) {
			firebaseAuthProvider = new GoogleAuthProvider();
		} else if (provider === ThirdPartyAuthProvider.Apple) {
			const appleProvider = new OAuthProvider('apple.com');

			appleProvider.addScope('email');
			appleProvider.addScope('name');

			firebaseAuthProvider = appleProvider;
		} else if (provider === ThirdPartyAuthProvider.Microsoft) {
			const microsoftProvider = new OAuthProvider('microsoft.com');

			microsoftProvider.addScope('mail.read');

			firebaseAuthProvider = microsoftProvider;
		} else if (provider === ThirdPartyAuthProvider.Github) {
			firebaseAuthProvider = new GithubAuthProvider();
		} else {
			return;
		}

		signInWithPopup(firebaseAuth, firebaseAuthProvider)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

// TODO: Update currentuser atom immediately and refresh
export const signOut = () => firebaseAuth.signOut();

export const useSignUpCompany = () => {
	const config = useRecoilValue(authenticatedApiConfiguration);
	const setCurrentUser = useSetRecoilState(currentUserAtom);
	const setCurrentUserType = useSetRecoilState(currentUserTypeAtom);

	if (config == null) {
		return null;
	}

	return (company: CompanyDto): Promise<boolean> => {
		return new AuthApi(config)
			.companiesControllerSignup({
				companyDto: company,
			})
			.then((response) => {
				setCurrentUser(response);
				setCurrentUserType(UserType.COMPANY);
				return true;
			})
			.catch(() => false);
	};
};
