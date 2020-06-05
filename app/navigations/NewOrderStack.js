import React, { useReducer } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Order from '../screens/Order'
import { Button, Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ArticleList from '../screens/ArticleList'
import NewOrderStackReducer from '../reducers/NewOrderStackReducer'

const Stack = createStackNavigator()

export default function NewOrderStack() {

    const nagivation = useNavigation()

    const [state, dispatch] = useReducer(NewOrderStackReducer, {
        name: '',
        listArticle: [],
        observation: '',
        userLogged: '',
        createDate: '',
        createBy: ''
    }) 

    return(
       <Stack.Navigator>
           <Stack.Screen 
                name = "order"
                component = { Order }
                options = {{ 
                    title: 'Nota de Pedido',
                    headerRight: () => (
                        <Button
                          onPress={() => nagivation.navigate('articleList', {
                              state : state,
                              dispatch : dispatch
                          })}
                          color="#fff"
                          containerStyle={styles.btnContainer}
                          buttonStyle = { styles.btn }
                          icon={
                            <Icon
                              name="cart"
                              type="material-community"
                              size={20}
                              color="white"
                            />
                          }
                        />
                      )
                }}
                initialParams={{ state: state, dispatch: dispatch }}
           />
            <Stack.Screen
                name = 'articleList'
                component = { ArticleList }
                options = {{ title: "Artículos agregados" }}
            />
       </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        margin: 5
    },
    btn: {
        backgroundColor: '#00a680'
    }
})