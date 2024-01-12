import React from "react"
import { Text, View } from "react-native"
import { Link } from "react-router-native";
import FA5Icon from "@expo/vector-icons/FontAwesome5";

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

  //
  // Render items
  //
  const items = dataTypes //TODO: move to own component
    .filter(dataType => !dataType.startsWith('-'))
    .filter(dataType => !dataType.startsWith('x'))
    .map((dataType) => {

      //
      // extract important data
      //
      const title = dataHierarchy[dataType].title;
      const iconFamily = dataHierarchy[dataType].icon.split('.')[0];
      const iconName = dataHierarchy[dataType].icon.split('.')[1];

      //
      // render icon
      //
      let icon = null;
      //
      // Fontawesome 5
      //
      if(iconFamily === 'fa5s' || iconFamily === 'fa5' || iconFamily === 'fa5b'){
        // pad width to 26 to make all icons the same size
        icon = <FA5Icon name={iconName} style={{width: 26}} size={26} color='rgb(212,212,216)'/>
      }

      /**

      //
      // Elusive Icons 2
      //
      else if(iconFamily === 'ei'){
      }
      //
      // Material Icons 5 & 6
      //
      else if(iconFamily === 'mdi' || iconFamily === 'mdi6'){
      }
      //
      // Phosphor
      //
      else if(iconFamily === 'ph'){
      }
      //
      // Remix Icons
      //
      else if(iconFamily === 'ri'){
      }
      //
      // Code Icons
      //
      else if(iconFamily === 'msc'){
      }
      **/
      else {
        icon = <FA5Icon name='question-circle' size={26} color='rgb(212,212,216)'/>
      }

      //
      // render items
      //
      return (
        <Link 
          to={`/table/${dataType}`} 
          key={`${dataType}-link`} 
          underlayColor="rgba(255,255,255,0.1)"
          className="w-full h-fit "  
        >
          <View className='w-full h-fit flex flex-row justify-start items-center bg-gray-800 rounded-3xl p-4 mb-4'>
            {icon}
            <Text className="text-zinc-400 text-xl ml-4" key={`${dataType}-text`}>
              {title}
            </Text>
          </View>
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
