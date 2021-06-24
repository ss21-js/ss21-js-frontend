import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { ThemeMode, themeModeAtom } from 'store/general';

const darkStyles = {
	style: {
		background: '#333',
		color: '#fff',
	},
};

declare type Renderable = JSX.Element | string | null;
declare type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
declare type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

type ToastPromiseMsgs<T> = {
	loading: Renderable;
	success: ValueOrFunction<Renderable, T>;
	error: ValueOrFunction<Renderable, any>;
};

const useToast = () => {
	const theme = useRecoilValue(themeModeAtom);
	const options = {
		...(theme === ThemeMode.DARK ? darkStyles : undefined),
		duration: 5000,
	};

	function promise<T>(
		promise: Promise<T>,
		msgs: ToastPromiseMsgs<T> = {
			loading: 'Speichern...',
			success: <b>Gespeichert</b>,
			error: <b>Fehlgeschlagen</b>,
		}
	) {
		return toast.promise(promise, msgs, options);
	}

	return {
		success: (message: string) => toast.success(message, options),
		error: (message: string) => toast.error(message, options),
		promise: promise,
	};
};

export default useToast;
