import { AuthApi, StudentDto } from 'js-api-client';
import UserType from 'models/userType';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import currentUserState from 'store/user/currentUserState';
import currentUserTypeState from 'store/user/currentUserTypeState';

const useSignUpStudent = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);
	const setCurrentUser = useSetRecoilState(currentUserState);
	const setCurrentUserType = useSetRecoilState(currentUserTypeState);

	if (config == null) {
		return null;
	}

	return async (studentDto: StudentDto): Promise<boolean> => {
		try {
			const response = await new AuthApi(config).studentsControllerSignup({ studentDto });
			setCurrentUser(response);
			setCurrentUserType(UserType.STUDENT);
			return true;
		} catch (e) {
			return false;
		}
	};
};
export default useSignUpStudent;
