import IconButton from '@material-ui/core/IconButton';

export interface IconButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}


const IconButtonContainer: React.FC<IconButtonProps> = ({children, onClick}) => (
    <IconButton onClick={onClick}>
            {children}
    </IconButton>
);

export default IconButtonContainer;