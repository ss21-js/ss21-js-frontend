import { StudentsApi, UpdateStudentDto } from 'js-api-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import currentUserState from './currentUserState';

const useUpdateStudent = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);
	const setCurrentUser = useSetRecoilState(currentUserState);

	if (config == null) {
		return null;
	}

	return async (updateStudentDto: UpdateStudentDto) => {
		const newStudent = await new StudentsApi(config).studentsControllerUpdateProfile({
			updateStudentDto,
		});
		setCurrentUser(newStudent);
	};
};

export default useUpdateStudent;
