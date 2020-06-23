import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import OrderList from '../screens/OrderList'

const Stack = createStackNavigator()

export default function OrderListStack() {

    const navigation = useNavigation()

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name = "orderList"
                component = { OrderList }
                options = {{
                    title: "Lista de Pedidos"
                }}
            />
         </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    btnIcon: {
        marginLeft: 10
    },
    btn: {
        backgroundColor: '#fff'
    }
})