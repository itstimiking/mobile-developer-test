import TextInput from '@/src/components/TextInput';
import { useAppSelector } from '@/src/hooks/redux';
import { ForgotPasswordData } from '@/src/utils/types';
import { forgotPasswordValidationSchema } from '@/src/utils/validators';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { Alert, Pressable, Text, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const initialValues: ForgotPasswordData = { email: ''};
  const user = useAppSelector(state=>state.auth.user)
  
    const handleSubmit = (values: ForgotPasswordData) => {
      console.log('forgot password values:', values);
      Alert.alert(`An email has been sent to ${user?.email}`)
    };
  
    return (
      <View className="flex-1 justify-center items-center bg-white p-8">
        <Text className="text-2xl font-bold mb-6 text-center">Reset Password</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : false}
              />
              <View className='w-full gap-3'>
              <Pressable
                onPress={() => handleSubmit()}
                className={`py-3 rounded mt-4 ${isValid ? 'bg-blue-600' : 'bg-blue-300'}`}
                disabled={!isValid}
              >
                <Text className="text-white text-center font-semibold">Forgot my password</Text>
              </Pressable>
              <Text>Remembered your password? <Link href={'/auth/login'} className='text-blue-500'>Login</Link></Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    );
}