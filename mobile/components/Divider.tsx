import { StyleSheet, View, ViewProps } from 'react-native';
import React from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = ViewProps & {
	spacing?: number;
};

const Divider = ({ spacing = 2, style, ...otherProps }: Props) => {
	const color = useThemeColor({}, 'divider');
	return (
		<View
			style={[
				{
					height: 2,
					marginVertical: spacing,
					backgroundColor: color,
				},
				style,
			]}
			{...otherProps}
		/>
	);
};

export default Divider;

const styles = StyleSheet.create({});
