import React, { useEffect } from 'react';

declare global {
    interface Window {
        FB: any; // Replace 'any' with the specific type if you have the typings for Facebook SDK
    }
}

const FacebookSDKInitializer: React.FC = () => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '248752947914523',
                cookie: true,
                xfbml: true,
                version: 'v17.0',
            });
        };

        // Load the Facebook SDK asynchronously
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.defer = true;
        script.async = true;
        script.crossOrigin = 'anonymous'
        document.body.appendChild(script);

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default FacebookSDKInitializer;
