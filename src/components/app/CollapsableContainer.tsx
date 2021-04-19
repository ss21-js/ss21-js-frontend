import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import Chip from '@material-ui/core/Chip';
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React from "react";
import { useRecoilState } from 'recoil';
import { buttonOpen } from 'src/store/general';

const CollapsableContainer = () => {
  const theme = useTheme();
  const [open, setOpen] = useRecoilState(buttonOpen);
  const jobs= [{name: "Vollzeitjob"},{name: "Teilzeitjob"},{name: "Praktikumsstelle"},{name: "Ausbildungsstelle"},{name: "Remotejob"}]

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      css={css`
            width: 100%;
            max-width: 340px;
            background-color: ${theme.palette.background.paper};
	  `}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Art der Anstellung" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {jobs.map( job => (
            <ListItem key={job.name} button 
                css={css`
                    padding-left: ${theme.spacing(4)};
                `}
            >
                <ListItemIcon>
                <Checkbox 
                    color="primary"
                />
                </ListItemIcon>
                <ListItemText primary={job.name} />
                {/* TODO: counter-Function ergänzen, sobald es vom BE verfügbar ist */}
                <Chip label="11" />
          </ListItem>
        ))}
        </List>
      </Collapse>
    </List>
  );
}
export default CollapsableContainer;