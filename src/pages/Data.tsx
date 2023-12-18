import ImageComponent from 'components/ImageComponent';
import React from 'react'
import { Text, View } from 'react-native'
import { Link, useParams } from 'react-router-native'

import { getDocumentFromId } from 'utils/DBInteractions';

export default function() {
  const { id } = useParams();

  const loadData = React.useCallback(async () => {
    const _data = await getDocumentFromId(id!);
    return _data;
  }, [id])

  const [data, setData] = React.useState<Record<string,any>>({});

  React.useEffect(() => {
    loadData().then(setData);
  }, [])

  const items = Object
    .keys(data)
    .filter(key => !key.startsWith('-'))
    .filter(key => !key.startsWith('_'))
    .map((key, index) => {

    if(key === 'image'){
      return <ImageComponent data={data[key]} key={`${id}-image-${index}`} />
    }
    
    return (
      <View className='w-full h-fit p-4' key={`${id}-li-${index}`}>
        <Text className='text-zinc-300' key={`${id}-text-${index}`}>
          {key}
        </Text>
      </View>
    )
  })

  return (
    <View className='w-full h-full'>
      {items}
    </View>
  )
}
