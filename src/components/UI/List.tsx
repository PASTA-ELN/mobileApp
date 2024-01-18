import React from 'react'
import { Text, View } from "react-native"

//
// Component Props
//
type IListProps = {
  entries: string[];
}
//
// Component
//
export default function(props: IListProps) {
  //
  //
  //
  const items = props.entries.map((entry, index) => {
    return <ListItem key={index} entry={entry} />
  });
  //
  // Render
  //
  return (
    <View>
      {items}
    </View>
  )
}

//
// ListItem Component Props
//
type IListItemProps = {
  entry: string;
}
//
// ListItem Component
//
export function ListItem(props: IListItemProps) {
  return (
    <View>
      <Text>
        {props.entry}
      </Text>
    </View>
  )
}
