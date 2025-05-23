import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux';
import { registerUser } from '@/src/store/slices/authSlice';
import { RegisterData } from '@/src/utils/types';
import { registrationValidationSchema } from '@/src/utils/validators';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';

export default function RegisterScreen() {
  const initialValues: RegisterData = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirm: ''
  };
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch()

  const handleRegistration = (values: RegisterData) => {
    dispatch(registerUser(values))
  };
  return (
    
    <ScrollView className='flex-1'>
      <KeyboardAvoidingView
        className="justify-center items-center p-8"
        behavior='padding'
      >
        <Text className="text-xl">Enter You Details</Text>
        <View className='w-full'>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationValidationSchema}
            onSubmit={handleRegistration}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid,setFieldError }) => (
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
                  label="First name"
                  placeholder="Enter your first name"
                  value={values.first_name}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  error={touched.first_name && errors.first_name ? errors.first_name : false}
                />
                <TextInput
                  label="Last name"
                  placeholder="Enter your last name"
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  error={touched.last_name && errors.last_name ? errors.last_name : false}
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
                <TextInput
                  label="Password"
                  placeholder="Confirm password"
                  autoCapitalize='none'
                  secureTextEntry
                  togglePassword
                  value={values.confirm}
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  error={touched.confirm && errors.confirm ? errors.confirm : false}
                />
                <View className='w-full gap-3'>
                  <Button
                    onPress={() => {
                      if(values.password === values.confirm)
                        handleSubmit()
                      else
                        setFieldError('password',"password does not match")
                        setFieldError('confirm',"password does not match")
                    }}
                    className={`py-3 rounded mt-4 ${isValid ? 'bg-blue-600' : 'bg-blue-300'}`}
                    disabled={!isValid}
                    loading={loading}
                  >
                    <Text className="text-white text-center font-semibold">Sign up</Text>
                  </Button>
                  <Text>Already have an account? <Link href={'/auth/login'} className='text-blue-500'>Login</Link></Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}