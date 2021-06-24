import { joiResolver } from '@hookform/resolvers/joi';
import useToast from 'common/useToast';
import StepperContainer from 'components/app/StepperContainer';
import CompanyFormAddress from 'components/company/CompanyFormAddress';
import CompanyFormGeneral from 'components/company/CompanyFormGeneral';
import OnboardingCompanyProfile from 'components/company/OnboardingCompanyProfile';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from 'index';
import { Address, Company, CompanyDto } from 'js-api-client';
import { companySchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import { useSignUpCompany } from 'store/auth/useSignUpCompany';

const OnboardingCompanyPage: React.FC = () => {
	const toast = useToast();
	const signUpCompany = useSignUpCompany();

	const firebaseUser = useRecoilValue(currentFirebaseUserState);

	const [loading, setLoading] = React.useState(false);
	const [company, setCompany] = React.useState<Partial<Company>>({
		email: firebaseUser?.email ?? undefined,
	});
	const [headerFile, setHeaderFile] = React.useState<File | null>(null);
	const [profileFile, setProfileFile] = React.useState<File | null>(null);

	const { control, getValues, trigger } = useForm<Company>({
		resolver: joiResolver(companySchema),
		defaultValues: company,
		mode: 'all',
	});

	const handleHeaderImage = (file: File, url: string) => {
		setHeaderFile(file);
		setCompany((company) => ({
			...company,
			companyHeaderImageUrl: url,
		}));
	};

	const handleProfileImage = (file: File, url: string) => {
		setProfileFile(file);
		setCompany((company) => ({
			...company,
			companyProfileImageUrl: url,
		}));
	};

	const handleNext = async (from: number, to: number) => {
		const values = getValues();
		setCompany((company) => ({
			...company,
			address: values.address,
			name: values.name,
			companyInfo: values.companyInfo,
			email: values.email,
			homepage: values.homepage,
		}));

		if (from === 0) {
			return (
				await Promise.all([trigger('name'), trigger('companyInfo'), trigger('homepage'), trigger('email')])
			).every((v) => v);
		} else if (from === 1) {
			return (
				await Promise.all([
					trigger('address.city'),
					trigger('address.country'),
					trigger('address.state'),
					trigger('address.street1'),
					trigger('address.street2'),
					trigger('address.zip'),
				])
			).every((v) => v);
		} else if (to === 3) {
			setLoading(true);
			var headerUrl = '';
			var profileUrl = '';

			if (headerFile) {
				const headerRef = ref(firebaseStorage, `images/${firebaseUser?.id}/${headerFile.name}`);
				await uploadBytes(headerRef, headerFile);
				headerUrl = `images/${firebaseUser?.id}/${headerFile.name}`;
			}

			if (profileFile) {
				const profileRef = ref(firebaseStorage, `images/${firebaseUser?.id}/${profileFile.name}`);
				await uploadBytes(profileRef, profileFile);
				profileUrl = `images/${firebaseUser?.id}/${profileFile.name}`;
			}

			const address: Address = {
				city: company.address?.city ?? '',
				country: company.address?.country ?? '',
				state: company.address?.state ?? '',
				street1: company.address?.street1 ?? '',
				street2: company.address?.street2 ?? '',
				zip: company.address?.zip ?? 0,
			};

			const companyDto: CompanyDto = {
				name: company.name ?? '',
				email: company.email ?? '',
				address: address,
				companyInfo: company.companyInfo ?? '',
				homepage: company.homepage ?? '',
				companyHeaderImageUrl: headerUrl,
				companyProfileImageUrl: profileUrl,
			};

			const result = toast.promise(signUpCompany!(companyDto));
			setLoading(false);
			return result;
		}

		return true;
	};

	return (
		<StepperContainer
			steps={[
				{
					label: 'Unternehmen',
					component: <CompanyFormGeneral control={control} disabled={loading} />,
				},
				{
					label: 'Adresse',
					component: <CompanyFormAddress control={control} disabled={loading} />,
				},
				{
					label: 'Profilbilder',
					component: (
						<OnboardingCompanyProfile
							company={company}
							headerImageChanged={handleHeaderImage}
							profileImageChanged={handleProfileImage}
						/>
					),
				},
			]}
			next={handleNext}
		/>
	);
};

export default OnboardingCompanyPage;
