import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SortOption {
	key: string;
	title: string;
}
export type SortDropdownProps = Omit<UseFormRegisterReturn, 'ref'> & {
	options: SortOption[];
	inputRef: React.Ref<any>;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ options, name, onBlur, onChange, inputRef }) => {
	const theme = useTheme();

	return (
		<FormControl
			css={css`
				margin: ${theme.spacing(1)};
				display: inline;
				width: 100%;
			`}
		>
			<FormLabel>Sortieren nach: </FormLabel>
			<NativeSelect name={name} onChange={onChange} onBlur={onBlur} inputRef={inputRef}>
				{options.map((option) => (
					<option value={option.key}>{option.key}</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default SortDropdown;
