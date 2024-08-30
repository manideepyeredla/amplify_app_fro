import React from 'react';
import QueryForm from './components/QueryForm';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <Authenticator signUpConfig={{ hiddenDefaults: ['email'] }} hideSignUp>
      {({ signOut, user }) => (
        <div>
          <h1>Fraud Transaction Data</h1>
          <p>Welcome, {user.username}</p>
          <QueryForm />
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
