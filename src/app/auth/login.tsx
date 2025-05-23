import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux';
import { loginUser } from '@/src/store/slices/authSlice';
import { loginValidationSchema } from '@/src/utils/validators';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { KeyboardAvoidingView, Text, View } from 'react-native';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state)=>state.auth.loading);

  const initialValues: LoginFormValues = { email: '', password: '' };

  const handleLogin = (values: LoginFormValues) => {
    dispatch(loginUser(values))
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 justify-center items-center bg-white p-8"
      behavior='padding'
    >
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
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
            <TextInput
              label="Password"
              placeholder="Enter your password"
              autoCapitalize='none'
              secureTextEntry
              togglePassword
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? errors.password : false}
            />
            <View>
              <Link href={'/auth/forgot-password'}>Forgot password</Link>
            </View>
            <View className='w-full gap-3'>
              <Button
                onPress={() => handleSubmit()}
                className={`py-3 rounded mt-4 ${isValid ? 'bg-blue-600' : 'bg-blue-300'}`}
                disabled={!isValid}
                loading={loading}
              >
                <Text className="text-white text-center font-semibold">Login</Text>
              </Button>
              <Text>Don't have an account? <Link href={'/auth/register'} className='text-blue-500'>Sign up</Link></Text>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}