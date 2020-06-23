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
                    title: 'Nota de Pedido',
                    /*
                    headerRight: () => (
                        <Button
                          onPress={() => nagivation.navigate('articleList')}
                          color="#fff"
                          containerStyle={styles.btnContainer}
                          buttonStyle = { styles.btn }
                          icon={
                            <Icon
                              name="cart-arrow-right"
                              type="material-community"
                              size={20}
                              color="white"
                            />
                          }
                        />
                      )
                      */
                }}
           />
            <Stack.Screen
                name = 'articleList'
                component = { ArticleList }
                options = {{ title: "Artículos" }}
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
            
                {
                    // TODO: SE PUEDE BORRAR? LO TENGO EN EL OTRO : OrderListStack
                    /**
                     * <Stack.Screen
                            name = 'orderList'
                            component = { OrderList }
                            options = {{
                                title: "Lista de Pedidos"
                            }}
                        />
                     * 
                     */
                }
            
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