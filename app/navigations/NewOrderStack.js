import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'

import Order from '../screens/Order'
import ArticleList from '../screens/ArticleList'

const Stack = createStackNavigator()

export default function NewOrderStack() {
    return(
       <Stack.Navigator>
           <Stack.Screen 
                name = "order"
                component = { Order }
                options = {{ 
                    title: 'Nota de Pedido'
                }}
           />
            <Stack.Screen
                name = 'articleList'
                component = { ArticleList }
                options = {{ 
                  title: "Artículos" 
                }}
            />
       </Stack.Navigator>
    )
}