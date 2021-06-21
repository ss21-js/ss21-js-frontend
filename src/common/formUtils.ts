import { Control, Path, useController, UseFormRegisterReturn } from 'react-hook-form';

type UseFormRegisterMaterialReturn = Omit<UseFormRegisterReturn, 'ref'> & {
	id: string;
	inputRef: React.Ref<any>;
	error: boolean;
	helperText?: string;
	defaultValue: string;
};

export const useMaterialRegister = <T>(
	control: Control<T>,
	name: Path<T>,
	includeHelperText = true
): UseFormRegisterMaterialReturn => {
	const controller = useController({ name: name, control: control });

	let re: UseFormRegisterMaterialReturn = {
		inputRef: controller.field.ref,
		id: controller.field.name,
		name: controller.field.name,
		onBlur: async () => controller.field.onBlur(),
		onChange: async (e) => controller.field.onChange(e),
		error: controller.fieldState.error !== undefined,
		defaultValue: controller.field.value as string,
	};

	if (includeHelperText) {
		re = { ...re, helperText: controller.fieldState.error?.message };
	}

	return re;
};
