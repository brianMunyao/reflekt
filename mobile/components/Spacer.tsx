import { View } from 'react-native';
import React from 'react';

type Props = {
	h?: number;
	w?: number;
	flex?: boolean;
};

const Spacer = ({ h, w, flex }: Props) => {
	return <View style={{ height: h, width: w, flex: flex ? 1 : 0 }} />;
};

export default Spacer;
