import React, { useEffect } from 'react';
import FacebookSDKInitializer from './FacebookInitializer';

const FacebookSignupButton = () => {

    const checkLoginState = () => {
        FB.getLoginStatus(function (response: any) {
            statusChangeCallback(response);
        });
    };

    const statusChangeCallback = (response: { status: string; }) => {
        debugger;
        if (response.status === 'connected') {
            testAPI();
        } else {
            //document.getElementById('status').innerHTML = 'Please log into this webpage.';
        }
    };

    const testAPI = () => {
        console.log('Welcome! Fetching your information....');
        FB.api(
            '/me',
            {
                fields:
                    'id,first_name,middle_name,last_name,gender,age_range,birthday,email,link,location,about,languages,political,website,picture,short_name',
            },
            function (response: { first_name: string; last_name: string; }) {
                console.log(JSON.stringify(response));
                console.log('Successful login for: ' + response.first_name + ' ' + response.last_name);
                //document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + ' ' + response.last_name + '!';
            }
        );
    };

    return (
        <div>
            {React.createElement('div', {
                className: 'fb-login-button',
                'data-width': '',
                'data-size': 'large',
                'data-button-type': '',
                'data-layout': '',
                'data-auto-logout-link': 'false',
                'data-use-continue-as': 'true',
                scope: 'public_profile,email,read_insights,instagram_basic,instagram_manage_insights',
                'onlogin': checkLoginState(),
            })}
            <div id="status"></div>
        </div>
    );
};

export default FacebookSignupButton;
