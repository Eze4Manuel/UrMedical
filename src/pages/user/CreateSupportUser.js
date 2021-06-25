import React, { useState } from 'react';
import Global from '../../assets/styles/Global';
import GoBack from '../../components/widgets/GoBack';
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
  Container,
} from '@mantine/core';


// validate support user data
export const supportValidationRules = {
    username: (value) => value.trim().length >= 2,
    password: (value) => value.trim().length >= 6,
    privilege: (value) => value.trim().length === 1,
}

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

const CreateSupportUser = (props) => {
    const NavigationBar = props.NavigationBar;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const form = useForm({
        initialValues: formInitailValues,
        validationRules: supportValidationRules,
    });
    
        // handle request
    const handleSubmit = () => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
        setLoading(false);
            console.log('form values', form.values);
        }, 3000);
    };

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <GoBack />
                <div style={Global.center}>
                    <h3 className="mt-3 mb-5">Create a New Support Account</h3>
                <div>
                    <Paper
                        padding={props.noPadding ? 0 : 'lg'}
                        shadow={props.noShadow ? null : 0}
                        style={{ position: 'relative', overflow: 'hidden', height: 400, width: '100%' }}
                                >
                        <Container  size={600}>
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
                                    'Password should at least 6 characters'
                                }
                                />

                                {error && (
                                <Text color="red" size="sm" style={{ marginTop: 10 }}>
                                    {error}
                                </Text>
                                )}

                                {!props.noSubmit && (
                                <ElementsGroup position="center" style={{ marginTop: 25 }}>
                                    <Button size="lg" color="blue" type="submit" fullWidth>
                                        Login
                                    </Button>
                                </ElementsGroup>
                                )}
                            </form>
                        </Container>
                    </Paper>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateSupportUser
