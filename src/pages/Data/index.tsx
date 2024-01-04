import React from 'react'
import { ScrollView, TouchableOpacity, Text, View, Alert } from 'react-native'
import { useLocation, useNavigate, useParams } from 'react-router-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

import ImageComponent from 'components/ImageComponent';
import { useDataHierarchy } from 'hooks/localstorage';
import { addQrCodeToDocument, getDocumentFromId } from 'utils/DBInteractions';
import Markdown from 'components/markdown';
import EditComment from './EditComment';
import EditQRCodes from './EditQRCodes';
import CameraComponent from 'components/CameraComponent';
import { BarCodeScannerResult } from 'expo-barcode-scanner';

//
// Component
//
export default function() {
  //
  // State
  //
  const [data, setData] = React.useState<Record<string,any>>({});
  const [showEditComment, setShowEditComment] = React.useState(false);
  const [showEditQR, setShowEditQR] = React.useState(false);
  const [showAddQR, setShowAddQR] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

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
  function handleBarcodeScanned(data: BarCodeScannerResult, retry: () => void){
    const qrCode = data.data;
    if(!qrCode)
      return retry();
    
    Alert.alert(
      'Add QR Code?',
      `Do you want to add the QR Code ${qrCode} to this document?`,
      [
        {
          text: 'Cancel',
          onPress: () => retry(),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => addQRCode(qrCode)
        }
      ]
    )
  }
  async function addQRCode(qrCode: string){
    setShowAddQR(false);

    addQrCodeToDocument(id!, qrCode)
      .then(newRev => {
        setData({
          ...data,
          _rev: newRev,
          qrCode: [
            ...(data.qrCode || []),
            qrCode
          ]
        })
      })
      .catch(err => {
        Alert.alert('Error', err);
        return;
      });
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
  const menuName = `${id}-menu`;
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
              <TouchableOpacity onPress={() => setShowEditComment(true)}>
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
  if(!id || !dataHierarchy || !dataHierarchy[dataType!]){
    return <View></View>
  }

  //
  // Render edit
  //
  if(showEditComment){
    return (
      <EditComment 
        title='Edit comment' 
        value={data['comment']} 
        onSubmit={() => {}} 
        onclose={() => { setShowEditComment(false) }}  
      />
    )
  }

  //
  // Render add QR
  //
  if(showAddQR){
    return (
      <CameraComponent 
        handleBarcodeScanned={handleBarcodeScanned}
        exit={() => setShowAddQR(false)}
      />
    )
  }

  //
  // Render edit QR
  //
  if(showEditQR){
    return (
      <EditQRCodes 
        codes={data['qrCode']}
        onSubmit={() => {}}
        onClose={() => { setShowEditQR(false) }}
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
        <Menu 
          renderer={renderers.NotAnimatedContextMenu} 
          name={menuName}
          opened={showMenu}
          onBackdropPress={() => setShowMenu(false)}
        >
          <MenuTrigger onPress={() => setShowMenu(true)}>
            <Ionicons name='menu-sharp' size={30} color='rgb(59 130 246)'/>
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                paddingRight: 50,
                paddingLeft: 50,
                width: '100%'
              },
              optionsWrapper: {
                borderRadius: 10,
                backgroundColor: 'rgb(31,41,55)',
              },
              optionWrapper: {
                padding: 10,
              }
            }}
          >
            <MenuOption onSelect={() => {
                setShowAddQR(true)
                setShowMenu(false)
              }}
            >
              <Text className='text-blue-500 text-2xl'>
                Add QR-Code
              </Text>
            </MenuOption>
            <View className='border-b border-gray-700'/>
            <MenuOption onSelect={() => {
                setShowEditQR(true)
                setShowMenu(false)
              }}
            >
              <Text className='text-blue-500 text-2xl'>
                Edit QR Codes
              </Text>
            </MenuOption>
            <View className='border-b border-gray-700'/>
            <MenuOption onSelect={() => Alert.alert('not implemented')}>
              <Text className='text-blue-500 text-2xl'>
                Add Issue
              </Text>
            </MenuOption>
            <View className='border-b border-gray-700'/>
            <MenuOption onSelect={() => Alert.alert('not implemented')}>
              <Text className='text-blue-500 text-2xl'>
                Edit Attachment
              </Text>
            </MenuOption>
            <View className='border-b border-gray-700'/>
            <MenuOption onSelect={() => setShowMenu(false)}>
              <Text className='text-blue-500 text-2xl'>
                Close
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
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
