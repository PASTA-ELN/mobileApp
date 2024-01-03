import React from "react"
import { Text, View } from "react-native"
import { Link } from "react-router-native";

import { useDataHierarchy, useDataTypes } from "hooks/localstorage";

//
// Component
//
export default function() {
  //
  // Hook calls
  //
  const dataTypes = useDataTypes();
  const dataHierarchy = useDataHierarchy();

  //
  // Render empty if no data
  //
  if(dataTypes.length === 0 || Object.keys(dataHierarchy).length === 0) 
    return (<View></View>);

  const items = dataTypes //TODO: move to own component
    .filter(dataType => !dataType.startsWith('-'))
    .filter(dataType => !dataType.startsWith('x'))
    .map((dataType) => {

      const title = dataHierarchy[dataType].title;

      return (
        <Link 
          to={`/table/${dataType}`} 
          key={`${dataType}-link`} 
          underlayColor="rgba(255,255,255,0.1)"
          className="w-full h-fit flex flex-row justify-between items-center bg-gray-800 rounded-3xl p-4 mb-4"  
        >
            <Text className="text-blue-500 text-xl" key={`${dataType}-text`}>
              {title}
            </Text>
        </Link>
      )
    });
  
  //
  // Render
  //
  return (
    <View className="w-full h-full p-4">
      <View className="w-full h-fit p-2">
        <Text className="text-zinc-300 text-4xl font-bold">Data</Text>
      </View>
      {items}
    </View>
  )
}
