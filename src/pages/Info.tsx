import Section from 'components/UI/Section'
import React from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { useNavigate } from 'react-router-native';

export default function() {

  const navigate = useNavigate();

  return (
    <View className='w-full h-full p-2'>
      <Section>
        <Text className='text-zinc-300 text-xl mx-auto my-2'>
          ada
          <Text className='text-blue-500'>P</Text>
          tive m
          <Text className='text-blue-500'>A</Text>
          terials 
          <View className='w-2'/>
          <Text className='text-blue-500'>S</Text>
          cience me
          <Text className='text-blue-500'>T</Text>
          adat
          <Text className='text-blue-500'>A</Text>
        </Text>
      </Section>
      <Section>
        <Text className='text-zinc-300 mx-auto my-2 p-2'>
          This app has been developed as Part of the PASTA-ELN ecosystem, at FZ-Juelich in Germany, by Thomas Düren and Steffen Brinckmann.
        </Text>
        <TouchableOpacity onPress={() => openLink('mailto:s.brinckmann@fz-juelich.de')}>
          <Text className='text-blue-500 mx-auto my-2 p-2'>
            Contact
          </Text>
        </TouchableOpacity>
      </Section>
      <Section>
        <Text className='text-zinc-300 mx-auto my-2 p-2'>
          The app is open source and available on GitHub.
        </Text>
        <TouchableOpacity onPress={() => openLink('https://github.com/PASTA-ELN/mobileApp')}>
          <Text className='text-blue-500 mx-auto my-2 p-2'>
            Link to GitHub
          </Text>
        </TouchableOpacity>
      </Section>
      <Section>
        <Text className='text-zinc-300 mx-auto my-2 p-2'>
          If you need help, try looking at our documentation.
        </Text>
        <TouchableOpacity onPress={() => openLink('https://pasta-eln.github.io/pasta-eln')}>
          <Text className='text-blue-500 mx-auto my-2 p-2'>
            Documentation
          </Text>
        </TouchableOpacity>
      </Section>
    </View>
  )
}

function openLink(url: string) {
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error(`Error opening url ${url}`, err));
}