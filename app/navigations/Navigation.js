import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import OrderListStack from '../screens/OrderListStack'
import NewOrderStack from '../screens/NewOrderStack'

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name = "orderListStack" 
                    component = { OrderListStack } 
                    options = {{ title: 'Mis Pedidos' }} 
                />
                <Tab.Screen 
                    name = "newOrderStack" 
                    component = { NewOrderStack } 
                    options = {{ title: 'Nuevo Pedido' }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}