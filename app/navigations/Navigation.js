import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import OrderListStack from '../screens/OrderListStack'
import NewOrderStack from '../screens/NewOrderStack'

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = "newOrderStack"
                tabBarOptions = {{
                    inactiveTintColor: '#646464',
                    activeTintColor: '#00a680'
                }}
                screenOptions = { ({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                }) }
            >
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

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "orderListStack":
            iconName = "format-list-bulleted"
            break;
        case "newOrderStack":
            iconName = "newspaper-plus"
            break;
        default:
            break;
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}