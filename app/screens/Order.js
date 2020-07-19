import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, Linking, TouchableOpacity, ListHeaderComponent } from 'react-native'
import { Input, Button, Icon, CheckBox, Overlay, ListItem } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import Toast from 'react-native-easy-toast'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import Loading from '../components/Loading'
import qs from 'qs';
import { productos } from '../utils/constants'
import 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import ModalTest from '../modals/ModalTest'
const db = firebase.firestore(firebaseApp)

export default function Order({ route }) {

    const nagivation = useNavigation()
    const toastRef = useRef()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // mejorar esto con un objeto
    const [errorName, showErrorName] = useState(false)
    const [errorListArticleEmpty, setErrorListArticleEmpty] = useState(false)
    
    const defaultOrder = {
        name: '',
        listArticle: [],
        observation: '',
        createDate: new Date(),
        createBy: ''
    }

    const [state, setState] = useState(defaultOrder)

    useEffect(() => {
        setState(defaultOrder)

        // nos traemos la info del usuario logueado
        // la guardo en una variable asi cuando se modifica el state no va a buscarlo de nuevo
        // con esa variable guardada chequeo asi no lo vuelvo a llamar
       firebase
            .auth()
            .onAuthStateChanged((userInfo) => {
                setUser(userInfo)
            })
    }, [route])

    const onChangeSetState = (e, type) => {

        // borrar esta parte
        if(type === 'listArticle') {
            state.listArticle.push(e)
            return setState({
                ...state, 
            }) 
        }

        return setState({
            ...state, 
            [type]: e
        })
    }
   
    // esta funcion me va a guardar la orden en la base de dato del firebase
    const uploadOrderFirebase = () => {
        setIsLoading(true)

        db.collection('orders')
            .add({
                name: state.name,
                listArticle: state.listArticle,
                observation: state.observation,
                createDate: new Date(),
                createBy: firebase.auth().currentUser.uid
            })
            .then(() => {
                setIsLoading(false)
                console.log("OK")
                nagivation.navigate('orderList') // cuando envia el pedido lo mandamos a la lista de pedidos enviados
            })
            .catch(() => {
                setIsLoading(false)
                toastRef.current.show('Error al intentar guardar el pedido, intentelo nuevamente')
            })
    }

    const sendOrder = () => {
        console.log("ENVIAR PEDIDO........")
        console.log("STATE: " , state)

        if(state.name === '') {
            showErrorName(true)
        }   
        else if(state.listArticle.length === 0){
            setErrorListArticleEmpty(true)
            showErrorName(false)
        } 
        else {
            uploadOrderFirebase()
            showErrorName(false)
            setErrorListArticleEmpty(false)
        }
    }

    return(
        <ScrollView style = { styles.scrollView }>
            <View>
                <Input 
                    placeholder = 'Nombre'
                    containerStyle = { styles.inputName }
                    onChange = { e => onChangeSetState(e.nativeEvent.text, 'name') }
                    defaultValue = { state.name }
                />
            </View> 

            <View>
                <ListItem
                    title = { 'Ver / agregar artículos' }
                    leftIcon = {{ 
                        name: "cart",
                        type: 'material-community'
                    }}
                    chevron
                    containerStyle = { styles.menuItem }
                    onPress={() => nagivation.navigate('articleList', {
                        setState: setState,
                        state: state
                    })}
                    disabledStyle={{backgroundColor: '#f2f2f2' }}
                />
            </View>

            <View style={{alignItems: 'center'}}>
            {
                state.listArticle.length > 0?
                <Text style = { styles.articleTextCount }>
                    Tienes {state.listArticle.length} artículos agregados
                </Text> : 
                <Text style = { styles.articleTextCount }>
                    Aún no tienes artículos agregados
                </Text>
            }
            </View>

            <Text>
                {
                    state.listArticle && 
                    state.listArticle.map((article, i) => {
                        <Text key={i}> { article } </Text>
                    })
                }
            </Text>

            <View>
                <Input 
                    placeholder = 'Observaciones'
                    containerStyle = { styles.inputObservation }
                    onChange = { e => onChangeSetState(e.nativeEvent.text, 'observation') }
                />
            </View>


            <View style = { styles.textErrorNameView }>
                {
                    errorName && 
                    <Text style = { styles.textErrorName }>El nombre no puede ser vacio</Text>
                }
                {
                    errorListArticleEmpty &&
                    <Text style = { styles.textErrorName }>Tienes que agregar al menos 1 artículo</Text>
                }
            </View>   

            {
                user?
                <Button 
                    title = 'Enviar pedido'
                    containerStyle = { styles.btnContainer }
                    buttonStyle = { styles.btnSendOrder }
                    onPress = { sendOrder }
                /> :
                <View style={styles.textLoginView}>
                    <Text style={styles.loginText}> Necesitas iniciar sesión para envíar pedidos </Text>
                </View>
            }

            <Loading isVisible = { isLoading } text = 'Enviando pedido' />
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        marginTop: 20
    },
    btnContainer: {
        marginTop: 50,
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
    inputName: {
        marginBottom: 20,
        marginTop: 10
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
    },
    btnAddArticle: {
        marginTop: 10,
        width: '90%',
        marginLeft: '5%',
        marginBottom: 15
    },
    inputObservation: {
        marginBottom: 20,
        marginTop: 30
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    textAddArticleError: {
        color: 'red'
    },
    articleTextCount: {
        marginTop: 30
    },
    textErrorNameView: {
        alignItems: 'center'
    },
    textErrorName: {
        color: 'red'
    },
    textLoginView: {
        alignItems: 'center'
    },
    loginText: {
        color: '#00a680',
        fontWeight: 'bold'
    }
})