
import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux';
import { updateUserProfile } from '@/src/store/slices/authSlice';
import { EditDetailsData } from '@/src/utils/types';
import { editValidationSchema } from '@/src/utils/validators';
import { Formik } from 'formik';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';

export default function EditScreen() {
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: EditDetailsData = {
      email: user!.email,
      first_name: user!.first_name,
      last_name: user!.last_name
    };
    const dispatch = useAppDispatch()
  
    const handleRegistration = (values: EditDetailsData) => {
      dispatch(updateUserProfile(values))
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
              validationSchema={editValidationSchema}
              onSubmit={handleRegistration}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid,setFieldError }) => (
                <>
                  <TextInput
                    label="Email"
                    placeholder={user?.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email ? errors.email : false}
                  />
                  <TextInput
                    label="First name"
                    placeholder={user?.first_name}
                    value={values.first_name}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    error={touched.first_name && errors.first_name ? errors.first_name : false}
                  />
                  <TextInput
                    label="Last name"
                    placeholder={user?.last_name}
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    error={touched.last_name && errors.last_name ? errors.last_name : false}
                  />
                  <View className='w-full gap-3'>
                    <Button
                      onPress={() => handleSubmit()}
                      className={`py-3 rounded mt-4 ${isValid ? 'bg-blue-600' : 'bg-blue-300'}`}
                      disabled={!isValid}
                      loading={loading}
                    >
                      <Text className="text-white text-center font-semibold">Edit details</Text>
                    </Button>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
}