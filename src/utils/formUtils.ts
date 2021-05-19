import { Control, Path, useController, UseFormRegisterReturn } from 'react-hook-form';

type UseFormRegisterMaterialReturn = Omit<UseFormRegisterReturn, 'ref'> & {
	inputRef: React.Ref<any>;
	error: boolean;
	helperText?: string;
};

export const useMaterialRegister =
	<T>(control: Control<T>) =>
	(name: Path<T>, includeHelperText = true): UseFormRegisterMaterialReturn => {
		const controller = useController({ name: name, control: control });

		let re: UseFormRegisterMaterialReturn = {
			inputRef: controller.field.ref,
			name: controller.field.name,
			onBlur: async () => controller.field.onBlur(),
			onChange: async (e) => controller.field.onChange(e),
			error: controller.fieldState.error !== undefined,
		};

		if (includeHelperText) {
			re = { ...re, helperText: controller.fieldState.error?.message };
		}

		return re;
	};
