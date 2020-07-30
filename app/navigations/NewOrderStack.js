import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Order from '../screens/Order'
import ArticleList from '../screens/ArticleList'
import OrderList from '../screens/OrderList'

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
            <Stack.Screen
                name = 'orderList'
                component = { OrderList }
                options = {{ 
                  title: "Lista de Pedidos" 
                }}
            />
       </Stack.Navigator>
    )
}