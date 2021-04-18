import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRoutesActive } from 'react-typesafe-routes';
import { useSetRecoilState } from 'recoil';
import router from 'src/Router';
import { drawerOpen } from 'src/store/general';
import StyledButton from '../StyledButton';

interface NavButtonProps {
	text: string;
	link: string;
	isActive: boolean;
	vertical?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ text, link, isActive, vertical }) => {
	const theme = useTheme();
	const history = useHistory();
	const setDrawerOpen = useSetRecoilState(drawerOpen);

	const handleClick = () => {
		setDrawerOpen(false);
		history.push(link);
	};

	return (
		<StyledButton
			variant="text"
			css={css`
				font-size: 1rem;
				line-height: 1rem;
				font-weight: 500;
				color: ${isActive ? theme.palette.primary.light : theme.palette.secondary.contrastText};
				margin: ${vertical ? '0.25rem 0.5rem' : '0'};
			`}
			onClick={handleClick}
		>
			{text}
		</StyledButton>
	);
};

export interface NavigationProps {
	vertical?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ vertical }) => {
	const { search, saved, profile } = useRoutesActive({
		search: router.app.children.search,
		saved: router.app.children.saved,
		profile: router.app.children.profile,
	});

	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				flex-direction: ${vertical ? 'column' : 'row'};
			`}
		>
			<NavButton link={router.app().search().$} text="Find Job" isActive={search} vertical={vertical} />
			<NavButton link={router.app().saved().$} text="Saved" isActive={saved} vertical={vertical} />
			<NavButton link={router.app().profile().$} text="Profile" isActive={profile} vertical={vertical} />
		</div>
	);
};
export default Navigation;
