import React from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { useLocation, useNavigate, useParams } from 'react-router-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import ImageComponent from 'components/ImageComponent';
import { useDataHierarchy } from 'hooks/localstorage';
import { getDocumentFromId } from 'utils/DBInteractions';
import Markdown from 'components/markdown';
import Edit from 'components/UI/Edit';

//
// Component
//
export default function() {
  //
  // State
  //
  const [data, setData] = React.useState<Record<string,any>>({});
  const [showEdit, setShowEdit] = React.useState(false);

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
  const fileType = data ? data['-name']? data['-name'].split('.').at(-1): '': '';
  const items = entries
    //
    // Move Image and content to top and Comment to bottom
    //
    .sort(([a, _a], [b, _b]) => {
      if(a === 'image' || a === 'content' || b === 'comment')
        return -1
      return 1
    })
    .map(([key, value], index) => {
      //
      // Render image
      //
      if(key === 'image'){
        return <ImageComponent data={data[key]} key={`${id}-image-${index}`} />
      }

      //
      // Render Content
      //
      if(key === 'content'){
        //
        // Render markdown
        //
        if(fileType === 'md')
          return <Markdown key={`${id}-md`}>{value}</Markdown>
      }
      //
      // Render comment
      //
      if(key === 'comment'){
        return (
          <View className='w-full h-fit bg-gray-800 flex items-center pt-4' key={`${id}-comment`}>
            <View className='w-full h-fit flex flex-row items-center justify-between px-4 pb-2'>
              <View className='w-6'/>
              <Text className='text-xl text-zinc-300 underline'> Comment </Text>
              <TouchableOpacity onPress={() => setShowEdit(true)}>
                <FontAwesome name='edit' size={24} color='white'/>
              </TouchableOpacity>
            </View>
            <Markdown>{value}</Markdown>
          </View>
        )
      }

      //
      // Render last item
      //
      if(index === entries.length - 1 && !data['-attachment']) {
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
    });
  
  //
  // Render attachment
  //
  if(data['-attachment']){
    items.push(
      <View className='w-full h-fit p-4 bg-gray-800' key={`${id}-attachment`}>
        <Text className='text-zinc-300'>
          Attachment: {JSON.stringify(data['-attachment'])}
        </Text>
      </View>
    )
  }

  //
  // Render invalid data type
  //
  if(!dataHierarchy || !dataHierarchy[dataType!]){
    return <View></View>
  }

  //
  // Render edit
  //
  if(showEdit){
    return (
      <Edit 
        title='Edit comment' 
        value={data['comment']} 
        onSubmit={() => {}} 
        onclose={() => { setShowEdit(false) }}  
      />
    )
  }

  //
  // Render
  //
  return (
    <View className='w-full h-full pb-12'>
      <View className='w-full h-16 p-4 flex flex-row items-center justify-between border-b-2 border-gray-700'>
        <TouchableOpacity onPress={() => navigate(`/table/${dataType}`)}>
          <View className='flex flex-row items-center justify-center'>
            <Ionicons name="chevron-back" size={30} color="rgb(59 130 246)"/>
            <Text className='text-blue-500 text-2xl'>
              {dataHierarchy[dataType!].title}
            </Text>
          </View>
        </TouchableOpacity>
        <Menu>
          {/** TODO: move Icon to the right  */}
          <MenuTrigger >
            <Ionicons name='menu-sharp' size={30} color='rgb(59 130 246)'/>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => {}}>
              <Text className='text-blue-500 text-2xl'>
                Edit
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => {}}>
              <Text className='text-blue-500 text-2xl'>
                Delete
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        <TouchableOpacity >
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
