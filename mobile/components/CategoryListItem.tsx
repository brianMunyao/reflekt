import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ICategory } from '@/types/ICategory';
import { Ionicons } from '@expo/vector-icons';

type Props = { category: ICategory };

const CategoryListItem = ({ category }: Props) => {
	return (
		<View>
			<Ionicons name={category.icon as any} size={20} />
			<Text>{category.name}</Text>
		</View>
	);
};

export default CategoryListItem;

const styles = StyleSheet.create({});
