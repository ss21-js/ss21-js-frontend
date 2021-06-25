import { Student } from 'js-api-client';
import React from 'react';
import ProfileImages from '../profile/ProfileHeaderImages';
import StudentAbout from './profile/StudentAbout';

export interface OnboardingStudentProfileProps {
	student: Partial<Student>;
	headerImageChanged: (file: File, url: string) => void;
	profileImageChanged: (file: File, url: string) => void;
}

const OnboardingStudentProfile: React.FC<OnboardingStudentProfileProps> = ({
	student,
	headerImageChanged,
	profileImageChanged,
}) => {
	return (
		<div>
			<ProfileImages
				// headerImageUrl={student.studentHeaderImageUrl}
				headerImageChanged={headerImageChanged}
				// profileImageUrl={student.studentProfileImageUrl}
				profileImageChanged={profileImageChanged}
				disableFirebase
			/>
			<StudentAbout student={student as Student} />
		</div>
	);
};

export default OnboardingStudentProfile;
