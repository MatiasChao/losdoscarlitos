import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Order from '../screens/Order'
import { Button, Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import OrderList from '../screens/OrderList'
import ArticleList from '../screens/ArticleList'
import EditOrder from '../screens/EditOrder'

const Stack = createStackNavigator()

export default function NewOrderStack() {

    const navigation = useNavigation()

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
                name = 'editOrder'
                component = { EditOrder }
                options = {{
                    title: "Editar pedido",
                    headerLeft: () => (
                        <Button
                          onPress={() => navigation.navigate('orderList')}
                          buttonStyle = { styles.btn }
                          style = { styles.btnIcon } 
                          icon={
                            <Icon
                              name="arrow-left"
                              type="material-community"
                              size={27}
                              color="#00a680"
                            />
                          }
                        />
                    )
                }}
            />
       </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        margin: 5
    },
    btn: {
        backgroundColor: '#fff'
    },
    btnIcon: {
        marginLeft: 10
    }
})