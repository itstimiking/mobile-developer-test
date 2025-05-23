import clsx from 'clsx';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  variant?: 'filled' | 'outline' | 'text';
  children: ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const baseStyles = 'px-4 py-4 rounded items-center justify-center flex-row';

const variantStyles = {
  filled: 'bg-blue-500',
  outline: 'border border-blue-500',
  text: '',
};

const textColorStyles = {
  filled: 'text-white',
  outline: 'text-blue-500',
  text: 'text-blue-500',
};

export default function Button({
  variant = 'filled',
  children,
  className,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        (disabled || loading) && 'opacity-50',
        className
      )}
    >
      {loading && <ActivityIndicator size="small" color={variant === 'filled' ? 'white' : '#3B82F6'} className="mr-2" />}
      <Text className={textColorStyles[variant]}>{children}</Text>
    </Pressable>
  );
}