import { getDownloadURL, ref } from 'firebase/storage';
import { firebaseStorage } from 'index';
import { selectorFamily } from 'recoil';

const firebaseStorageQuery = selectorFamily<string | undefined, string>({
	key: 'firebaseStorageQuery',
	get: (file) => async () => {
		const fileRef = ref(firebaseStorage, file);
		return getDownloadURL(fileRef);
	},
});

export default firebaseStorageQuery;
