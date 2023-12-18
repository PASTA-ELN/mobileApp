import React from 'react'

import { getDataTypes, getDataHierarchy } from 'utils/localInteractions';

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
