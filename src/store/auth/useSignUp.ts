import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'index';
import { useSetRecoilState } from 'recoil';
import authState from './authState';
import EmailPassword from './emailPassword';

const useSignUp = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (arg: EmailPassword) => {
		setAuthState({
			loading: true,
			error: null,
		});

		createUserWithEmailAndPassword(firebaseAuth, arg.email, arg.password)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export default useSignUp;
