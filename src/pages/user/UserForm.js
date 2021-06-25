import React from 'react';
import { useForm } from '@mantine/hooks';
import {
  ElementsGroup,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Title,
  useMantineTheme,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { 
    EnvelopeClosedIcon, 
    LockClosedIcon 
} from '@modulz/radix-icons';

// users initail form state
export const formInitailValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    sex: '',
    password: '',
    username: '', // support staff only (privileg=1)
    partner_name: '',
    partner_info: '',
    avatar: '',
    addr: '',
    city: '',
    state: '',
    contact_info: '', // where we hard about app 
    privilege: '' // 1,2,3
}

// validate user data
export const userValidationRules = {
    first_name: (value) => value.trim().length >= 0,
    last_name: (value) => value.trim().length >= 0,
    email: (value) => /^\S+@\S+$/.test(value),
    phone: (value) => value.trim().length === 11,
    password: (value) => value.trim().length >= 6,
    privilege: (value) => value.trim().length === 1,
}

// validate support user data
export const supportValidationRules = {
    username: (value) => value.trim().length >= 2,
    password: (value) => value.trim().length >= 6,
    privilege: (value) => value.trim().length === 1,
}

// validate user data
export const partnerValidationRules = {
    first_name: (value) => value.trim().length > 0,
    last_name: (value) => value.trim().length > 0,
    email: (value) => /^\S+@\S+$/.test(value),
    phone: (value) => value.trim().length === 11,
    // password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
    password: (value) => value.trim().length >= 6,
    partner_name: (value) => value.trim().length > 0,
    addr: (value) => value.trim().length > 0,
    city: (value) => value.trim().length > 0,
    state: (value) => value.trim().length > 0,
    privilege: (value) => value.trim().length === 2,
}


export default function UserForm({ 
    noShadow, 
    noPadding, 
    noSubmit, 
    privilege, 
    userInitialValues,
    onSubmitForm,
    loading,
    error,
    height,
    width,
}) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: userInitialValues ?? formInitailValues,
    validationRules: partnerValidationRules,
  });

  return (
    <Paper padding={noPadding ? 0 : 'lg'} shadow={noShadow ? null : 'sm'}
        style={{ position: 'relative', overflow: 'hidden', 
            height: height ?? 350, width: width ?? 300 
        }}>
        <Title style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
            Support User Form
        </Title>
        <form onSubmit={form.onSubmit(onSubmitForm)}>
            <LoadingOverlay visible={loading} />
            <TextInput
            required
            placeholder="Your username"
            label="Username"
            icon={<EnvelopeClosedIcon />}
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            onFocus={() => form.setFieldError('username', false)}
            error={form.errors.username && 'Field should contain a username'}
            />

            <PasswordInput
            style={{ marginTop: 15 }}
            required
            placeholder="Password"
            label="Password"
            showPasswordLabel="Show password"
            hidePasswordLabel="Hide password"
            icon={<LockClosedIcon />}
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            onFocus={() => form.setFieldError('password', false)}
            error={
                form.errors.password &&
                'Password should contain 1 number, 1 letter and at least 6 characters'
            }
            />

            {error && (
            <Text color="red" size="sm" style={{ marginTop: 10 }}>
                {error}
            </Text>
            )}

            {!noSubmit && (
            <ElementsGroup position="center" style={{ marginTop: 25 }}>
                <Button disabled={loading} size="lg" color="blue" type="submit" fullWidth>
                    Login
                </Button>
            </ElementsGroup>
            )}
        </form>
    </Paper>
  );
}
