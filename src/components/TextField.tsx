import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';

export interface TextFieldProps {
	label: string;
	id: string;
	defaultValue: string;
}

const UiTextField = styled(TextField)`
	:hover: {
		color: red;
	},
`;

const TextFieldContainer: React.FC<TextFieldProps> = ({ label, id, defaultValue }) => {
	return (
		<UiTextField variant="outlined" margin="normal" fullWidth id={id} label={label} defaultValue={defaultValue} />
	);
};

export default TextFieldContainer;
