import {
	Control,
	FieldPath,
	PathValue,
	useController,
	UseControllerReturn,
	UseFormRegisterReturn,
} from 'react-hook-form';
import { ChangeHandler } from 'react-hook-form/dist/types/form';

type UseFormRegisterMaterialReturn<T> = Omit<UseFormRegisterReturn, 'ref'> & {
	id: string;
	inputRef: React.Ref<any>;
	error: boolean;
	value?: T;
	helperText?: string;
	defaultValue: T;
};

type TransformerType = 'number' | 'date';

interface Options {
	includeHelperText?: boolean;
	includeValue?: boolean;
	transformer?: TransformerType;
}

const onChange = <T, P extends FieldPath<T>>(
	controller: UseControllerReturn<T, P>,
	transformer?: TransformerType
): ChangeHandler => {
	return async (e) => {
		switch (transformer) {
			case 'number':
				let numberOutput = parseInt(e.target.value, 10);
				numberOutput = isNaN(numberOutput) ? 0 : numberOutput;
				return controller.field.onChange(numberOutput);
			case 'date':
				const dateOutput = new Date(e?.target?.value);
				return controller.field.onChange(dateOutput);
			default:
				return controller.field.onChange(e);
		}
	};
};

const value = <T, P extends FieldPath<T>>(
	controller: UseControllerReturn<T, P>,
	transformer?: TransformerType
): PathValue<T, P> => {
	switch (transformer) {
		case 'number':
			const numberValue: number = controller.field.value ?? NaN;
			return (isNaN(numberValue) || numberValue === 0 ? '' : numberValue.toString()) as PathValue<T, P>;
		case 'date':
			const dateValue: Date = controller.field.value ?? new Date();
			return dateValue as PathValue<T, P>;
		default:
			return controller.field.value;
	}
};

const useMaterialRegister = <T, P extends FieldPath<T>>(
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
		onChange: onChange(controller, options?.transformer),
		error: controller.fieldState.error !== undefined,
		defaultValue: controller.field.value,
	};

	if (options?.includeHelperText ?? true) {
		re = { ...re, helperText: controller.fieldState.error?.message };
	}

	if (options?.includeValue ?? false) {
		re = { ...re, value: value(controller, options?.transformer) };
	}

	return re;
};

export default useMaterialRegister;
