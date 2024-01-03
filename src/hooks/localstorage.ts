import React from 'react'

import { getDataTypes, getDataHierarchy } from 'utils/localInteractions';

/**
 * Uses the local storage to get the data types
 * - relies on React.useState
 * - uses and Effect to load the data types on mount
 * @returns a reference to saved data types
 */
export function useDataTypes(){
  const [dataTypes, setDataTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    getDataTypes().then(dataTypes => {
      if(dataTypes) {
        setDataTypes(dataTypes);
      }
    });
  }, []);

  return dataTypes;
}
/**
 * Uses the local storage to get the data hierarchy
 * - relies on React.useState
 * - uses and Effect to load the data hierarchy on mount
 * @returns a reference to saved data hierarchy
 */
export function useDataHierarchy(){
  const [dataHierarchy, setDataHierarchy] = React.useState<Record<string, any>>([]);

  React.useEffect(() => {
    getDataHierarchy().then(dataHierarchy => {
      if(dataHierarchy) {
        setDataHierarchy(dataHierarchy);
      }
    });
  }, []);

  return dataHierarchy;
}
