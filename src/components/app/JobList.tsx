import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import Chip from '@material-ui/core/Chip';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

interface JobListProps {
    counter: number;
}

interface Job {
  name: string;
}

const jobs: Job[] = [{name: "Vollzeitjob"},{name: "Teilzeitjob"},{name: "Praktikumsstelle"},{name: "Ausbildungsstelle"},{name: "Remotejob"}]

const JobList: React.FC<JobListProps > = ({counter}) => {
  const theme = useTheme();

  return (
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
                <Chip label={counter} />
            </ListItem>
        ))}
    </List>
  );
}
export default JobList;