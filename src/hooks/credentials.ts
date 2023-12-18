import React from 'react'

import { type Credentials } from 'types/Credentials'
import { loadCredentials } from 'utils/localInteractions';

export function useLocalCredentials() {
  const [credentials, setCredentials] = React.useState<Record<string, Credentials>>({});

  React.useEffect(() => {
    loadCredentials()
      .then((creds) => {
        if(creds)
          setCredentials(creds);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return credentials
}
