import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import FacebookSignupButton from './SignUpButtons/FacebookSignUpButton';
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialInstagram,
    LoginSocialTwitter,
    LoginSocialTiktok,
    IResolveParams,
    LoginSocialLinkedin,
} from 'reactjs-social-login'
import axios from 'axios';

// CUSTOMIZE ANY UI BUTTON
import {
    FacebookLoginButton,
    GoogleLoginButton,
    InstagramLoginButton,
    LinkedInLoginButton,
    TikTokLoginButton,
    TwitterLoginButton,
} from 'react-social-login-buttons'

import { ReactComponent as TiktokLogo } from './assets/tiktok.svg'

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;


const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
        role: string;
        termsAccepted: boolean;
    }>({
        name: '',
        email: '',
        password: '',
        role: '',
        termsAccepted: false,
    });

    const [registrationStatus, setRegistrationStatus] = useState<
        'success' | 'error' | 'idle'
    >('idle'); // Initialize with 'idle'

    // Update the event type for handleInputChange
    const handleInputChange = (event: React.FormEvent<HTMLElement | HTMLInputElement>, fieldName: string) => {
        const { name, value } = event.currentTarget as HTMLInputElement; // Asserting the correct type
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };


    const handleRoleSelect = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
        if (option) {
            setFormData({
                ...formData,
                role: option.key as string,
            });
        }
    };


    const handleTermsAcceptance = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setFormData({
            ...formData,
            termsAccepted: checked ?? false, // Set to false if checked is undefined
        });
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Perform form validation
        const { name, email, password, role, termsAccepted } = formData;
        if (!name || !email || !password || !role || !termsAccepted) {
            alert('Please fill in all the required fields.');
            return;
        }

        // Assuming form data is valid, you can make an API call here with the formData object
        // Replace the API_ENDPOINT with your actual API endpoint
        // fetch(API_ENDPOINT, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //   // Handle the API response here
        //   // If sign-up is successful, you can redirect to the Dashboard page
        //   window.location.href = 'dashboard.html'; // Replace with your desired destination
        // })
        // .catch(error => {
        //   // Handle any network or API call errors
        //   console.error('An error occurred:', error);
        //   alert('Sign up failed. Please try again.');
        // });

        // Simulate successful sign-up
        alert('Sign up successful! Redirecting to Dashboard...');
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Replace with your desired destination
        }, 1000);
    };


    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState<any>()

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, []);

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, []);

    return (
        <div>
            {registrationStatus === 'success' && (
                <p>User registered successfully! Redirecting to dashboard...</p>
            )}
            {registrationStatus === 'error' && (
                <p>Registration failed. Please try again.</p>
            )}
            {registrationStatus === 'idle' && (
                <div className="container">
                    <h1 className="center-align">Welcome to the Collaboration Platform!</h1>
                    <Panel type={PanelType.medium} headerText="Sign Up" isOpen={true} isLightDismiss={true}>
                        <form id="regular-signup-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col s12 m6 offset-m3">
                                    <Stack tokens={{ childrenGap: 10, padding: 20 }}>
                                        <TextField label="Full Name" required value={formData.name} onChange={(ev) => handleInputChange(ev, 'name')} />
                                        <TextField label="Email Address" type="email" required value={formData.email} onChange={(ev) => handleInputChange(ev, 'email')} />
                                        <TextField label="Password" type="password" required value={formData.password} onChange={(ev) => handleInputChange(ev, 'password')} />
                                        <Dropdown
                                            label="Role"
                                            options={[
                                                { key: 'influencer', text: 'Influencer' },
                                                { key: 'brand', text: 'Brand' },
                                            ]}
                                            required
                                            selectedKey={formData.role}
                                            onChange={handleRoleSelect}
                                        />
                                        <Checkbox label="I accept the Terms and Conditions" required checked={formData.termsAccepted} onChange={handleTermsAcceptance} />
                                        <PrimaryButton text="Sign Up" type="submit" id="signup-button" />
                                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                            <hr style={{ flexGrow: 1, height: '1px', backgroundColor: '#ddd', margin: 0 }} />
                                            <span style={{ margin: '0 10px', color: '#777' }}>OR</span>
                                            <hr style={{ flexGrow: 1, height: '1px', backgroundColor: '#ddd', margin: 0 }} />
                                        </div>
                                        <Stack horizontalAlign="center" tokens={{ childrenGap: 10, padding: 20 }}>
                                            {/* <LoginSocialGoogle
                                        isOnlyGetToken
                                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                                        onLoginStart={onLoginStart}
                                        onResolve={({ provider, data }: IResolveParams) => {
                                            setProvider(provider)
                                            setProfile(data)
                                        }}
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        <GoogleLoginButton />
                                    </LoginSocialGoogle> */}

                                            <LoginSocialFacebook
                                                isOnlyGetToken
                                                appId='248752947914523'
                                                onLoginStart={onLoginStart}
                                                onResolve={async ({ provider, data }: IResolveParams) => {
                                                    const response = await axios.post('user/register-facebook', { data });

                                                    if (response.status === 201 && response.data.message === 'User registration completed') {
                                                        setRegistrationStatus('success');
                                                        setProvider(provider);
                                                        setProfile(data);
                                                        // Redirect to the dashboard route
                                                        console.log("navigate user to different page");
                                                    } else {
                                                        setRegistrationStatus('error');
                                                    }
                                                }}
                                                onReject={(err) => {
                                                    debugger;
                                                    console.log(err)
                                                }}
                                            >
                                                <FacebookLoginButton />
                                            </LoginSocialFacebook>

                                            <LoginSocialInstagram
                                                isOnlyGetToken
                                                client_id='962072688487872'
                                                client_secret='48623f35f706259a160ae8d5886eb07a'
                                                redirect_uri={REDIRECT_URI}
                                                onLoginStart={onLoginStart}
                                                onResolve={({ provider, data }: IResolveParams) => {
                                                    debugger;
                                                    console.log(JSON.stringify(data));
                                                    setProvider(provider)
                                                    setProfile(data)
                                                }}
                                                onReject={(err: any) => {
                                                    console.log(err)
                                                }}
                                            >
                                                <InstagramLoginButton />
                                            </LoginSocialInstagram>

                                            <LoginSocialLinkedin
                                                isOnlyGetToken
                                                client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
                                                client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
                                                redirect_uri={REDIRECT_URI}
                                                onLoginStart={onLoginStart}
                                                onResolve={({ provider, data }: IResolveParams) => {
                                                    setProvider(provider)
                                                    setProfile(data)
                                                }}
                                                onReject={(err: any) => {
                                                    console.log(err)
                                                }}
                                            >
                                                <LinkedInLoginButton />
                                            </LoginSocialLinkedin>

                                            <LoginSocialTwitter
                                                isOnlyGetToken
                                                client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
                                                redirect_uri={REDIRECT_URI}
                                                onLoginStart={onLoginStart}
                                                onResolve={({ provider, data }: IResolveParams) => {
                                                    setProvider(provider)
                                                    setProfile(data)
                                                }}
                                                onReject={(err: any) => {
                                                    console.log(err)
                                                }}
                                            >
                                                <TwitterLoginButton />
                                            </LoginSocialTwitter>

                                            <LoginSocialTiktok
                                                client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY || ''}
                                                redirect_uri={REDIRECT_URI}
                                                onLoginStart={onLoginStart}
                                                onResolve={({ provider, data }) => {
                                                    setProvider(provider);
                                                    setProfile(data);
                                                }}
                                                onReject={(err) => {
                                                    console.log(err);
                                                }}
                                                className="pinterest-btn"
                                            >
                                                <TikTokLoginButton />
                                            </LoginSocialTiktok>
                                        </Stack>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </Panel>
                </div >
            )}
        </div>
    );
};

export default SignupForm;
