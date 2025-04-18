import { StyleSheet, View, Text } from 'react-native';

interface ImportStepsProps {
  currentStep: number;
}

export default function ImportSteps({ currentStep }: ImportStepsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        <View style={[
          styles.step, 
          currentStep >= 1 && styles.activeStep
        ]}>
          <Text style={[
            styles.stepNumber,
            currentStep >= 1 && styles.activeStepNumber
          ]}>1</Text>
        </View>
        
        <View style={[styles.line, currentStep >= 2 && styles.activeLine]} />
        
        <View style={[
          styles.step, 
          currentStep >= 2 && styles.activeStep
        ]}>
          <Text style={[
            styles.stepNumber,
            currentStep >= 2 && styles.activeStepNumber
          ]}>2</Text>
        </View>
      </View>
      
      <View style={styles.labelsContainer}>
        <Text style={[
          styles.stepLabel,
          currentStep === 1 && styles.activeStepLabel
        ]}>Select File</Text>
        
        <Text style={[
          styles.stepLabel,
          currentStep === 2 && styles.activeStepLabel
        ]}>Configure</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activeStep: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  stepNumber: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '600',
  },
  activeStepNumber: {
    color: '#FFFFFF',
  },
  line: {
    height: 2,
    width: 80,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: '#25D366',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  stepLabel: {
    fontSize: 14,
    color: '#8E8E93',
    width: 80,
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
});