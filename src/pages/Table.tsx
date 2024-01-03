
import { useDataHierarchy } from 'hooks/localstorage';
import React from 'react'
import { Text, View } from 'react-native'
import { Link, useParams } from 'react-router-native'

import { getDataForType, getDocumentFromId } from 'utils/DBInteractions';

//
// Component
//
export default function() {

  //
  // State
  //
  const [data, setData] = React.useState<Record<string,any>[]>([]);

  //
  // Hook calls
  //
  const { dataType } = useParams();
  const dataHierarchy = useDataHierarchy();
  const loadData = React.useMemo(async () => {
    const _data = await getDataForType(dataType!);
    return _data;
  }, [dataType])

  //
  // Effects
  //
  React.useEffect(() => {
    loadData.then(setData);
  }, [])

  //
  // Render Error if invalid data type
  if(
    !dataType 
    ||!dataHierarchy 
    ||!dataHierarchy[dataType]
   ) 
   return <Text>Invalid data type</Text>

  //
  // Vars
  //
  const title = dataHierarchy[dataType!].title;
  const items = data.map((item, index) => { //TODO: move to own component
    return (
      <Link to={`/data/${item.id}?type=${dataType}`} key={`${dataType}-link-${index}`}>
        <View 
          className='w-full h-fit rounded-3xl bg-gray-800 p-4 mb-4'
          key={`${dataType}-li-${index}`}
        >
          <Text 
            className='text-zinc-300'
            key={`${dataType}-text-${index}`}  
          >
            {item.value[0]}
          </Text>
        </View>
      </Link>
    )
  })
  
  //
  // Render
  //
  return (
    <View className='w-full h-full p-4'>
      <View className='w-full h-fit p-2 mb-2'>
        <Text className='text-zinc-300 text-3xl font-bold'>
          {title}
        </Text>
      </View>
      {items}
    </View>
  )
}
