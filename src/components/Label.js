import React from 'react';

import {Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';

const Label = ({children, style = {}, props = {}}) => {
  return (
    <Text style={[styles.placeholder, style]} {...props}>
      {children}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  placeholder: {
    color: colors.BLACK,
  },
});
