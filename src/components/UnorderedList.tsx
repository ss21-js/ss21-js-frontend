import { experimentalStyled as styled } from '@material-ui/core/styles';
import ListIndicator from '../assets/list_indicator.svg';

const UnorderedList = styled('ul')`
	margin: 0;
	list-style-image: url(${ListIndicator});
`;

export default UnorderedList;
