import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Order from './Order'

const Stack = createStackNavigator()

export default function NewOrderStack() {
    return(
       <Stack.Navigator>
           <Stack.Screen 
                name = "order"
                component = { Order }
                options = {{ title: 'Nuevo Pedido' }}
           />
       </Stack.Navigator>
    )
}