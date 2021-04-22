import { css } from '@emotion/react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState } from 'react';

interface CollapsableProps {
	title: string;
	children: React.ReactChild;
}

const CollapsableContainer: React.FC<CollapsableProps> = ({ title, children }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen(!open);
	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			css={css`
				width: 20%;
				background-color: ${theme.palette.background.paper};
			`}
		>
			<ListItem button onClick={toggle}>
				<ListItemText primary={title} />
				{open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{children}
			</Collapse>
		</List>
	);
};
export default CollapsableContainer;
