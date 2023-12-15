import React from "react"
import { Text, View } from "react-native"
import { Link } from "react-router-native";

import { getDataTypes } from "utils/localInteractions"

type IProps = {

}
export default function(props: IProps) {

  const [dataTypes, setDataTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    getDataTypes().then(dataTypes => {
      if(dataTypes){
        setDataTypes(dataTypes);
      }
    });
  }, []);

  const items = dataTypes
    .filter(dataType => !dataType.startsWith('-'))
    .filter(dataType => !dataType.startsWith('x'))
    .map((dataType) => {
      return (
        <Link to={`/table/${dataType}`}>
          <View 
            key={`${dataType}-li`}
            className="w-full h-fit flex flex-row justify-between items-center bg-gray-700 rounded-3xl p-4 mb-4"  
          >
            <Text className="text-zinc-300 text-xl">
              {dataType}
            </Text>
          </View>
        </Link>
      )
    });

  return (
    <View className="w-full h-full p-4">
      {items}
    </View>
  )
}
