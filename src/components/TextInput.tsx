import { AntDesign } from '@expo/vector-icons';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { Pressable, TextInput as RNTextInput, Text, TextInputProps, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    label?: string;
    className?: string;
    containerClassName?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    error?: string | boolean;
    defaultErrorMessage?: string;
    togglePassword?: boolean;
}

export default function TextInput({
    label,
    className,
    containerClassName,
    leftIcon,
    rightIcon,
    error,
    defaultErrorMessage = 'This field is required',
    togglePassword = false,
    secureTextEntry,
    ...props
}: CustomTextInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = Boolean(error);
    const errorText = typeof error === 'string' ? error : defaultErrorMessage;
    const borderColor = hasError ? 'border-red-500' : 'border-gray-300';

    const isPasswordField = togglePassword || secureTextEntry;

    return (
        <View className={clsx('w-full mb-4', containerClassName)}>
            {label && <Text className="mb-1 text-gray-700 font-medium">{label}</Text>}
            <View className={clsx('flex-row items-center rounded px-3 py-2 bg-white border', borderColor)}>
                {leftIcon && <View className="mr-2">{leftIcon}</View>}
                <RNTextInput
                    {...props}
                    secureTextEntry={isPasswordField && !showPassword}
                    className={clsx('flex-1 text-base text-black', className)}
                    placeholderTextColor="#888"
                />
                {isPasswordField ? (
                    <Pressable onPress={() => setShowPassword(!showPassword)} className="ml-2">
                        <AntDesign
                            name={showPassword ? 'eyeo' : 'eye'}
                            size={20}
                            color="#555"
                        />
                    </Pressable>
                ) : (
                    rightIcon && <View className="ml-2">{rightIcon}</View>
                )}
            </View>
            {hasError && <Text className="text-red-500 text-sm mt-1">{errorText}</Text>}
        </View>
    );
}