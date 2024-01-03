import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { useLocation, useNavigate, useParams } from 'react-router-native'
import { Ionicons } from '@expo/vector-icons'

import ImageComponent from 'components/ImageComponent';
import { useDataHierarchy } from 'hooks/localstorage';
import { getDocumentFromId } from 'utils/DBInteractions';

//
// Component
//
export default function() {
  //
  // State
  //
  const [data, setData] = React.useState<Record<string,any>>({});

  //
  // Hook calls
  //
  const query = useQuery();
  const { id } = useParams();
  const dataHierarchy = useDataHierarchy();
  const navigate = useNavigate();
  
  //
  // Functions
  //
  function useQuery() {
    const location = useLocation();
    
    return React.useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location]);
  }

  //
  // Effects
  //
  React.useEffect(() => {
    if(!id)
      return setData({
        title: 'Invalid data type'
      })
    getDocumentFromId(id).then(setData);
  }, [])

  //
  // Vars
  //
  const entries = Object
    .entries(data)
    .filter(([key]) => !key.startsWith('-'))
    .filter(([key]) => !key.startsWith('_'))
  const dataType = query.get('type');
  const items = entries //TODO: move to own component
    .map(([key, value], index) => {
      //
      // Render image
      //
      if(key === 'image'){
        return <ImageComponent data={data[key]} key={`${id}-image-${index}`} />
      }

      //
      // Render last item
      //
      if(index === entries.length - 1) {
        return (
          <View 
            className='w-full h-fit p-4 bg-gray-800' 
            key={`${id}-li-${index}`}
          >
              <Text 
                className='text-zinc-300' 
                key={`${id}-text-${index}`}
              >
                {key}: {JSON.stringify(value)}
              </Text>
          </View>
        )
      }
      //
      // Render item
      //
      return (
        <View 
          className='w-full h-fit px-4 bg-gray-800' 
          key={`${id}-li-${index}`}
        >
          <View className='border-b border-gray-700 py-4'>
            <Text 
              className='text-zinc-300' 
              key={`${id}-text-${index}`}
            >
              {key}: {JSON.stringify(value)}
            </Text>
          </View>
        </View>
      )
    })

  //
  // Render invalid data type
  //
  if(!dataHierarchy || !dataHierarchy[dataType!]){
    return <View></View>
  }

  //
  // Render
  //
  return (
    <View className='w-full h-full pb-12'>
      <View className='w-full h-20 py-4 flex flex-row items-center justify-start'>
        <TouchableOpacity onPress={() => navigate(`/table/${dataType}`)}>
          <View className='flex flex-row items-center justify-center p-2'>
            <Ionicons name="chevron-back" size={30} color="rgb(59 130 246)"/>
            <Text className='text-blue-500 text-2xl'>
              {dataHierarchy[dataType!].title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
        {
        //TODO disable bouncing
        }
        <ScrollView className='w-full h-full' >
          {items}
        </ScrollView>
    </View>
  )
}
