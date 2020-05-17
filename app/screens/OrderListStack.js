import React from 'react'
import OrderList from './OrderList'

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