import useToast from 'common/useToast';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from 'index';
import { Company, Job, JobWithCompany } from 'js-api-client';
import React from 'react';
import useUpdateCompany from 'store/user/useUpdateCompany';
import EditCompanyDialog from '../EditCompanyDialog';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import userJobsQuery from 'store/user/userJobsQuery';
import CompanyProfile from 'components/company/CompanyProfile/CompanyProfile';
import Center from 'components/layout/Center';

const CurrentCompanyProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserState);
	const company = currentUser as Company | undefined;

	const [editOpen, setEditOpen] = React.useState(false);

	const user = useRecoilValue(currentUserState);
	const userJobs = useRecoilValue(userJobsQuery);
	const jobs = (userJobs as Job[] | null) ?? [];
	const jobsWithCompany = jobs.map<JobWithCompany>((j) => ({
		...j,
		publisher: user as Company,
	}));

	const toast = useToast();
	const updateCompany = useUpdateCompany();

	const uploadFileAndUpdateUrl = async (file: File, key: keyof Company) => {
		const refString = `images/${company!.id}/${file.name}`;
		const fileRef = ref(firebaseStorage, refString);
		await uploadBytes(fileRef, file);
		return updateCompany!({ ...company!, [key]: refString });
	};

	const headerImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'companyHeaderImageUrl'));
	};

	const profileImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'companyProfileImageUrl'));
	};

	const handleOpenEdit = () => setEditOpen(true);
	const handleCloseEdit = () => setEditOpen(false);

	if (company === undefined) {
		return <Center>Unternehmen nicht gefunden</Center>;
	}

	return (
		<>
			<CompanyProfile
				company={company}
				jobs={jobsWithCompany}
				profileImageChanged={profileImageChanged}
				headerImageChanged={headerImageChanged}
				handleOpenEdit={handleOpenEdit}
			/>
			<EditCompanyDialog open={editOpen} handleClose={handleCloseEdit} />
		</>
	);
};

export default CurrentCompanyProfile;
