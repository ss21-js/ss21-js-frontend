import MenuItem from '@material-ui/core/MenuItem';
import { Attribute } from '../../model/attribute';
import React from 'react';
import Select from '@material-ui/core/Select';

interface SortAttributesProps {
	attributes: Attribute[];
	onClick?: () => void;
}

const SortAttributes: React.FC<SortAttributesProps> = ({ attributes, onClick }) => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Select open={open} onClose={handleClose} onOpen={handleOpen} defaultValue={1}>
			{attributes.map((attribute) => (
				<MenuItem value={attribute.index} onClick={onClick} button>
					{attribute.text}
				</MenuItem>
			))}
		</Select>
	);
};
export default SortAttributes;
