

import React from 'react'
import { Text, View } from "react-native"

type IListProps = {
  entries: string[];
}

export default function(props: IListProps) {

  const items = props.entries.map((entry, index) => {
    return <ListItem key={index} entry={entry} />
  });

  return (
    <View>
      {items}
    </View>
  )
}

type IListItemProps = {
  entry: string;
}

export function ListItem(props: IListItemProps) {
  return (
    <View>
      <Text>
        {props.entry}
      </Text>
    </View>
  )
}
