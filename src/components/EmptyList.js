import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import constants from '../utils/constants';
import Label from './Label';

const EmptyList = ({
  height,
  emptyListLabelStyle = {},
  emptyListContainerStyle = {},
}) => {
  return (
    <Pressable style={[{height}, emptyListContainerStyle]}>
      <Label
        props={{numberOfLines: 1}}
        style={[styles.defaultStyle, emptyListLabelStyle]}>
        {constants.EMPTY}
      </Label>
    </Pressable>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  defaultStyle: {
    marginTop: 10,
    color: '#000',
  },
});
