export const filterOptions = {
	all: 'All',
	custom: 'Custom',
	daily: 'Daily',
	weekly: 'Weekly',
	monthly: 'Monthly',
	// yearly: 'Yearly',
} as const;

export type IFilterMode = keyof typeof filterOptions;
