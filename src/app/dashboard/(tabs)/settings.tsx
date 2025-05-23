import Button from '@/src/components/Button';
import { useAppDispatch } from '@/src/hooks/redux';
import { logoutUser } from '@/src/store/slices/authSlice';
import { Text, View } from 'react-native';


export default function SettingsScreen() {
  const dispatch = useAppDispatch();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl mb-4">Settings</Text>
      <View className='w-40'>
        <Button
          onPress={() => dispatch(logoutUser())}
          className="bg-red-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Log Out</Text>
        </Button>
      </View>
    </View>
  );
}