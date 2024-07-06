export const getBriefContentUtil = (text: string, maxCharacters = 70) => {
	return (
		text.substring(0, maxCharacters) +
		(text.length > maxCharacters ? '...' : '')
	);
};
