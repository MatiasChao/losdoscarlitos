import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrderList from '../screens/OrderList'

const Stack = createStackNavigator()

export default function OrderListStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name = "orderList"
                component = { OrderList }
                options = {{ title: 'Lista de Pedidos' }}
            />
         </Stack.Navigator>
    )
}