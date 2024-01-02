import React from 'react'

import { type Credentials } from 'types/Credentials'
import { loadAutologin, loadCredentials, saveAutologin } from 'utils/localInteractions';

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

export function useAutologinState() {
  const [autologin, _setAutologin] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadAutologin()
      .then((autologin) => {
        _setAutologin(autologin);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function setAutoLogin(autologin: boolean) {
    _setAutologin(autologin);
    saveAutologin(autologin)
      .then(() => loadAutologin())
      .then((savedAutologin) => {
        if(savedAutologin !== autologin) {
          _setAutologin(savedAutologin);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  

  return [autologin, setAutoLogin] as const;
}