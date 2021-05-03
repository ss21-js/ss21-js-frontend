import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

export interface SortOption {
	key: string;
}

interface SortOptionsProps {
	options: SortOption[];
}

const SortOptions: React.FC<SortOptionsProps> = ({ options}) => {

	const sortOptionsName = "";
	const [value, setValue] = React.useState<string>('');

	const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
		setValue(event.target.value);
	};

	const handleBlur = function() {
		// execute code after they’re out of focus or make API calls.
	}

	return (
		<NativeSelect
			name={sortOptionsName}
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
		>
			{options.map((option) => (
				<option value={option.key}>{option.key}</option>
			))}
		</NativeSelect>
	);
};

export default SortOptions;
