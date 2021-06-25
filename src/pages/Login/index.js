import React, { useState } from 'react';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import {
  TextInput,
  PasswordInput,
  ElementsGroup,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Title,
  useMantineTheme
} from '@mantine/core';
import { dispatcher } from '../../core/context/Store';
import Action from '../../core/context/ReducerAction';
import { useAuth } from '../../core/hooks/useAuth';
import Helpers from '../../core/func/Helpers';
import Styles from '../../assets/styles/Global';

const Login = ({ noPadding, noShadow, noSubmit }) => {
    const { set } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useMantineTheme();
    const form = useForm({
        initialValues: {
        username: '',
        password: '',
        },

        validationRules: {
        username: (value) => value.trim().length >= 2,
        password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        },
    });

    // handle request
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
        let res = await Helpers.signin(form.values);
        dispatcher({type: Action.user.set, payload: {user: res}});
        set(res); // save to localstorage
        setLoading(false);
        } catch (error) {
        let err = error?.response?.data?.err;
        setError(err)
        setLoading(false);
        }
    };

    return (
        <div style={{...Styles.center, marginTop: '15%'}}>
            <Paper
                padding={noPadding ? 0 : 'lg'}
                shadow={noShadow ? null : 'sm'}
                style={{ position: 'relative', overflow: 'hidden', height: 350, width: 300 }}
            >
                <Title style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
                    Sign in
                </Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        <Button size="lg" color="blue" type="submit" fullWidth>
                            Login
                        </Button>
                    </ElementsGroup>
                    )}
                </form>
                </Paper>
        </div>
    );
}

export default Login;