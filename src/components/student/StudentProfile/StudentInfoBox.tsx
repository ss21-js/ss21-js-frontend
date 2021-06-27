import InfoContainerGroup from 'components/app/InfoContainerGroup';
import RoundedBox from 'components/RoundedBox';
import { Student } from 'js-api-client';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';

export interface StudentInfoBoxProps {
	student: Student;
}

const StudentInfoBox: React.FC<StudentInfoBoxProps> = ({ student }) => {
	return (
		<RoundedBox>
			<InfoContainerGroup
				items={[
					{
						title: 'Arbeitsbereich',
						content:
							student.workArea === WorkArea.NONE
								? 'Keine Präferenz'
								: `${student.workArea.substring(0, 1).toUpperCase()}${student.workArea.substring(1)}`,
					},
					{
						title: 'Arbeitserfahrung',
						content: student.yearsOfExperience + ' Jahr(e)',
					},
					{
						title: 'Arbeitszeit',
						content:
							student.workBasis === WorkBasis.NONE
								? 'Keine Präferenz'
								: student.workBasis === WorkBasis.FULL_TIME
								? 'Vollzeit'
								: 'Teilzeit',
					},
				]}
			/>
		</RoundedBox>
	);
};

export default StudentInfoBox;
