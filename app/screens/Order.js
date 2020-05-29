import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, Linking } from 'react-native'
import { Input, Button, Icon, CheckBox } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import Loading from '../components/Loading'
import qs from 'qs';

export default function Order(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
   
    const [formData, setFormData] = useState({
        count: '',
        article: '',
        typeWeight: '',
        observation: ''
    })  
    
   const [count, setCount] = useState('')
   const [article, setArticle] = useState('')
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

    export async function sendEmail(to, subject, body, options = {}) {
        const { cc, bcc } = options;
    
        let url = `mailto:${to}`;
    
        // Create email link query
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: cc,
            bcc: bcc
        });
    
        if (query.length) {
            url += `?${query}`;
        }
    
        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);
    
        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }
    
        return Linking.openURL(url);
    }

    
    const onChange = (e, type) => {
        console.log("OK")
        return setFormData({
            ...formData, 
            [type]: e
        })
    }
    

    const sendOrder = () => {
        console.log("enviar pedido...")
        console.log(formData)

        let mail = require('../utils/mail')
        router.post('/email', mail.sendEmail);
    }

    return(
        <ScrollView style = { styles.scrollView }>
            
            <FormAdd
                setCount = { setCount }
                setArticle = { setArticle }
                setWeight = { setWeight }
                setTypeWeight = { setTypeWeight }
                setObservation = { setObservation }
                onChange={(e, type) => onChange(e, type)}
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
        setTypeWeight,
        setObservation,
        onChange
    } = props

    return (
        <View style = { styles.viewForm }>    
            <Input 
                placeholder = 'Comercio'
                containerStyle = { styles.input }
                onChange = { e => onChange(e.nativeEvent.text, 'count') }
            />
            <Input 
                placeholder = 'Cantidad'
                containerStyle = { styles.input }
                onChange = { e => onChange(e.nativeEvent.text, 'count') }
            />
            <View style = { styles.container }>
                <CheckBox
                    center
                    title='Kilogramo'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle = { styles.checkbox }
                    checked={true}
                />
                <CheckBox
                    center
                    title='Tira'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle = { styles.checkbox }
                    checked={false}
                />
                <CheckBox
                    center
                    title='Unidad'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle = { styles.checkbox }
                    checked={false}
                />
            </View>
           
             <Input 
                placeholder = 'Articulo'
                containerStyle = { styles.input }
                onChange = { e => setArticle(e.nativeEvent.text) }
            />
            <Input 
                placeholder = 'Observaciones'
                containerStyle = { styles.input }
                onChange = { e => setArticle(e.nativeEvent.text) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        marginTop: 20
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
        marginRight: 10,
        backgroundColor: '#fff'
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 70,
        width: '100%',
        padding: 0,
        margin: 0
    },
    checkbox: {
        backgroundColor: '#fff',
        width: 150,
        alignItems: 'center',
        marginLeft: 15
    },
    container: {
        flexDirection: 'row', 
        alignSelf: 'flex-start',
        alignItems: 'center'
    }
})