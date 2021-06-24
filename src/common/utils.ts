interface StringToHslColorOptions {
	saturation?: string;
	lightness?: string;
}

export const stringToHslColor = (input: string, options?: StringToHslColorOptions): string => {
	var hash = 0;
	for (var i = 0; i < input.length; i++) {
		hash = input.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}
	return `hsl(${hash % 360}, ${options?.saturation ?? '80%'}, ${options?.lightness ?? '70%'})`;
};
