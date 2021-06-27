import useTheme from '@material-ui/core/styles/useTheme';
import toast from 'react-hot-toast';
import { ToastOptions } from 'react-hot-toast/dist/core/types';
import { useRecoilValue } from 'recoil';
import themeModeState, { ThemeMode } from 'store/general/themeModeState';

declare type Renderable = JSX.Element | string | null;
declare type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
declare type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

type ToastPromiseMsgs<T> = {
	loading: Renderable;
	success: ValueOrFunction<Renderable, T>;
	error: ValueOrFunction<Renderable, any>;
};

const useToast = () => {
	const theme = useTheme();
	const themeMode = useRecoilValue(themeModeState);
	let options: ToastOptions;

	if (themeMode === ThemeMode.DARK) {
		options = {
			style: {
				background: '#333',
				color: '#fff',
				border: `solid ${theme.palette.divider} 1px`,
			},
			duration: 3000,
		};
	}

	function promise<T>(promise: Promise<T>, messages?: Partial<ToastPromiseMsgs<T>>) {
		return toast.promise(
			promise,
			{
				loading: 'Speichern...',
				success: <b>Gespeichert</b>,
				error: <b>Fehlgeschlagen</b>,
				...messages,
			},
			options
		);
	}

	return {
		success: (message: string) => toast.success(message, options),
		error: (message: string) => toast.error(message, options),
		promise: promise,
	};
};

export default useToast;
