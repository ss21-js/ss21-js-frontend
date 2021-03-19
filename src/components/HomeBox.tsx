import { makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

interface Props {
	size: number;
	color: 'red' | 'blue';
}

const useStyles = makeStyles({
	box: (props: Props) => {
		let background: string;

		switch (props.color) {
			case 'red':
				background = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
				break;
			case 'blue':
				background = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
				break;
			default:
				background = '';
				break;
		}

		return {
			display: 'flex',
			alignItems: 'center',
			borderRadius: 8,
			background,

			height: props.size,
			width: props.size,
		};
	},

	text: {
		color: 'white',
	},
});

const HomeBox: React.FC<Props> = (props: Props) => {
	const { size, color } = props;
	const classes = useStyles({ size, color });

	return (
		<Paper className={classes.box} color={color}>
			<Typography variant="subtitle1" className={classes.text}>
				I&apos;m an example of how to handle dynamic styles based on props
			</Typography>
		</Paper>
	);
};
export default HomeBox;
