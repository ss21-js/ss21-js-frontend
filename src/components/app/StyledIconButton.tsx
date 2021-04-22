import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

export interface IconButtonProps {
	icon: IconProp;
	onClick: () => void;
}

const StyledIconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => (
	<IconButton onClick={onClick}>
		<FontAwesomeIcon icon={icon} />
	</IconButton>
);

export default StyledIconButton;
