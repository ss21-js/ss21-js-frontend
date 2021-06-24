import { Control, FieldPath, PathValue, useController, UseFormRegisterReturn } from 'react-hook-form';

type UseFormRegisterMaterialReturn<T> = Omit<UseFormRegisterReturn, 'ref'> & {
	id: string;
	inputRef: React.Ref<any>;
	error: boolean;
	value?: T;
	helperText?: string;
	defaultValue: T;
};

interface Options {
	includeHelperText?: boolean;
	includeValue?: boolean;
}

export const useMaterialRegister = <T, P extends FieldPath<T>>(
	control: Control<T>,
	name: P,
	options?: Options
): UseFormRegisterMaterialReturn<PathValue<T, P>> => {
	const controller = useController({ name: name, control: control });

	let re: UseFormRegisterMaterialReturn<PathValue<T, P>> = {
		inputRef: controller.field.ref,
		id: controller.field.name,
		name: controller.field.name,
		onBlur: async () => controller.field.onBlur(),
		onChange: async (e) => controller.field.onChange(e),
		error: controller.fieldState.error !== undefined,
		defaultValue: controller.field.value,
	};

	if (options?.includeHelperText ?? true) {
		re = { ...re, helperText: controller.fieldState.error?.message };
	}

	if (options?.includeValue ?? false) {
		re = { ...re, value: controller.field.value };
	}

	return re;
};
