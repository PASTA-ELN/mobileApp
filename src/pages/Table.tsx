
import { useDataHierarchy } from 'hooks/localstorage';
import React from 'react'
import { Text, View } from 'react-native'
import { Link, useParams } from 'react-router-native'

import { getDataForType, getDocumentFromId } from 'utils/DBInteractions';

export default function() {

  const [data, setData] = React.useState<Record<string,any>[]>([]);

  const { dataType } = useParams();
  const dataHierarchy = useDataHierarchy();


  const loadData = React.useMemo(async () => {
    const _data = await getDataForType(dataType!);
    return _data;
  }, [dataType])

  React.useEffect(() => {
    loadData.then(setData);
  }, [])

  if(!dataType ||
    !dataHierarchy ||
    !dataHierarchy[dataType]
   ) 
   return <Text>Invalid data type</Text>

  const title = dataHierarchy[dataType!].title;
  const items = data.map((item, index) => {
    return (
      <Link to={`/data/${dataType}/${item.id}`} key={`${dataType}-link-${index}`}>
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
