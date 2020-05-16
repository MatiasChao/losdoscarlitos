import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import InvoiceClientList from '../screens/InvoiceClientList'
import Invoice from '../screens/Invoice'


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="invoiceClientList" 
                    component={InvoiceClientList} 
                    options={{title: 'Mis Pedidos'}} 
                />
                <Tab.Screen 
                    name="invoice" 
                    component={Invoice} 
                    options={{title: 'Nuevo Pedido'}} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}