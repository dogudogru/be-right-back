import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { forwardRef } from 'react';

const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  return <RNTextInput 
    ref={ref}
    style={[styles.input, props.style]}
    placeholderTextColor="#8E8E93"
    {...props}
  />;
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    fontSize: 16,
    color: '#1A1A1A',
  },
});

export default TextInput;