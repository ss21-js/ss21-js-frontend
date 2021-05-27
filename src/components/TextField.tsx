import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';

export interface TextFieldProps {
	label: string;
	id: string;
	defaultValue: string;
}

const TextFieldContainer: React.FC<TextFieldProps> = ({ label, id, defaultValue }) => {
	return <TextField variant="outlined" margin="normal" fullWidth id={id} label={label} defaultValue={defaultValue} />;
};

export default TextFieldContainer;
