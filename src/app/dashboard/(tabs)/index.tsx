import { useAppDispatch, useAppSelector } from '@/src/hooks/redux';
import { Text, View } from 'react-native';

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading)
  const user = useAppSelector(state => state.auth.user)

  return (
    <View className="flex-1 pt-20 bg-white px-10">
      <Text className="text-xl mb-4">Dashboard</Text>

      <View className='w-full min-h-40'>
        <View className='flex flex-row gap-2'>
          <Text className='font-bold w-28'>First Name: </Text>
          <Text>{user?.first_name}</Text>
        </View>
        <View className='flex flex-row gap-2'>
        <Text className='font-bold w-28'>Last Name:</Text>
          <Text>{user?.last_name}</Text>
        </View>
        <View className='flex flex-row gap-2'>
        <Text className='font-bold w-28'>Email:</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>

      <View>
        <Text>Go to setting page to logout</Text>
      </View>
    </View>
  );
}