import React from 'react'

import { CredentialsConfig, type Credentials } from 'types/Credentials'
import { loadAutologin, loadCredentials, saveAutologin } from 'utils/localInteractions';

/**
 * Uses the local storage to get the credentials
 *  - relies on React.useState
 *  - uses and Effect to load the credentials on mount
 * @returns a reference to all saved local credentials
 */
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

/**
 * Uses the local storage to get the autologin state
 * - relies on React.useState
 * - uses and Effect to load the autologin state on mount
 * @returns a tuple with the autologin state and the function to set it
 */
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

/**
 * Uses the local storage to get the used credentials
 * - relies on React.useState
 * - uses and Effect to load the credentials on mount
 * @returns a reference to the used credentials
 */
export function useCredentials() {
  //TODO

  const [credentials, setCredentials] = React.useState<CredentialsConfig | null>(null);

  React.useEffect(() => {
    //TODO
  }, [/*TODO*/]);

  return credentials;
}
