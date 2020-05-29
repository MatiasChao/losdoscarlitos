import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import Loading from '../components/Loading'

export default function Order(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    /*
    const [formData, setFormData] = useState({
        count: '',
        article: '',
        weight: '',
        typeWeight: '',
        observation: ''
    })  
    */
   const [count, setCount] = useState('')
   const [article, setArticle] = useState('')
   const [weight, setWeight] = useState('')
   const [typeWeight, setTypeWeight] = useState('')
   const [observation, setObservation] = useState('')

    useEffect(() => {

        // nos traemos la info del usuario logueado
       firebase
            .auth()
            .onAuthStateChanged((userInfo) => {
                console.log(userInfo)
                setUser(userInfo)
            })
    }, [])

     /*
    const onChange = () => {
        console.log("OK")
        return setFormData({
            ...formData, 
            [type]: e.nativeEvent.text
        })
    }
    */

    const sendOrder = () => {
        console.log("enviar pedido...")
        console.log(count)
    }

    return(
        <ScrollView style = { styles.scrollView }>
            
            <FormAdd
                setCount = { setCount }
                setArticle = { setArticle }
                setWeight = { setWeight }
                setTypeWeight = { setTypeWeight }
                setObservation = { setObservation }
            />

            {
                user && 
                <Button 
                    title = 'Enviar pedido'
                    containerStyle = { styles.btnContainer }
                    buttonStyle = { styles.btnSendOrder }
                    onPress = { sendOrder }
                />
            }
            <Loading isVisible = { isLoading } text = 'Enviando pedido' />
        </ScrollView>
    )
}

function FormAdd(props) {

    const {
        setCount,
        setArticle,
        setWeight,
        setTypeWeight,
        setObservation
    } = props

    return (
        <View style = { styles.viewForm }>
            <Input 
                placeholder = 'Cantidad'
                containerStyle = { styles.input }
                onChange = { e => setCount(e.nativeEvent.text) }
            />
             <Input 
                placeholder = 'Articulo'
                containerStyle = { styles.input }
                onChange = { e => setArticle(e.nativeEvent.text) }
            />
             <Input 
                placeholder = 'Peso'
                containerStyle = { styles.input }
                onChange = { e => setWeight(e.nativeEvent.text) }
            />
             <Input 
                placeholder = 'Observaciones'
                containerStyle = { styles.input }
                multiline = { true }
                inputContainerStyle = { styles.textArea }
                onChange = { e => setObservation(e.nativeEvent.text) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    btnContainer: {
        marginTop: 20,
        width: '90%',
        marginLeft: '5%'
    },
    btnSendOrder: {
        backgroundColor: '#00a680'
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    }
})