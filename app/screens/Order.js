import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, Linking } from 'react-native'
import { Input, Button, Icon, CheckBox, Overlay } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import Loading from '../components/Loading'
import qs from 'qs';
import { productos } from '../utils/constants'
import 'firebase/firestore'
import { State } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
const db = firebase.firestore(firebaseApp)

export default function Order({ route }) {

    const nagivation = useNavigation()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [listArticles, setListArticles] = useState([])
    const [showArticleModal, setShowArticleModal] = useState(false)
    
    const [state, setState] = useState({
        name: '',
        listArticle: [],
        observation: '',
        userLogged: '',
        createDate: new Date(),
        createBy: ''
    })

    const [article, setArticle] = useState({
        articleName: '',
        articleWeightType: '',
        articleCount: ''
    })

    useEffect(() => {

        // nos traemos la info del usuario logueado
        // la guardo en una variable asi cuando se modifica el state no va a buscarlo de nuevo
        //con esa variable guardada chequeo asi no lo vuelvo a llamar
       firebase
            .auth()
            .onAuthStateChanged((userInfo) => {
                setUser(userInfo)
            })
    }, [])

    const onChangeSetState = (e, type) => {

        let articles = []
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

    const onChangeSetArticle = (e, type) => {
        return setArticle({
            ...article, 
            [type]: e
        })
    }
   
    // esta funcion me va a guardar la orden en la base de dato del firebase
    const uploadOrderFirebase = () => {
        setIsLoading(true)


        // CHEQUEAR QUE LOS CAMPOS NO SEAN VACIOS !!!
        db.collection('orders')
            .add({
                name: '',
                listArticle: [],
                observation: '',
                createDate: new Date(),
                createBy: firebase.auth().currentUser.uid
            })
            .then(() => {
                setIsLoading(false)
                console.log("OK")
                nagivation.navigate('articleList')
                // aca lo puedo mandar a la lista de pedidos..
            })
            .catch(() => {
                setIsLoading(false)
                //toastRef.current.show('Error al intentar guardar el pedido, intentelo nuevamente')
            })
    }

    const addArticle = () => {
        // validar que no hayan campos vacios
        if(article.articleName === '' && article.articleWeightType === '' && articleCount === '') {
            // muestro mensaje de error
        } else {
            // lo agrego a la lista..
            onChangeSetState(article, 'listArticle')
        }
        setShowArticleModal(false)
    }

    const sendOrder = () => {
        console.log("ENVIAR PEDIDO........")
        console.log("STATE: " , state)
    }

    return(
        <ScrollView style = { styles.scrollView }>
            <View>
                <Input 
                    placeholder = 'Nombre'
                    containerStyle = { styles.inputName }
                    onChange = { e => onChangeSetState(e.nativeEvent.text, 'name') }
                />
            </View> 

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    containerStyle = { styles.btnOpenModalArticle }
                    buttonStyle = { styles.btnOpenModalStyle }
                    icon={{
                        name: "plus",
                        type: 'material-community',
                        size: 20,
                        color: "white"
                    }}
                    title="agregar artículo"
                    onPress = { () => setShowArticleModal(true) }
                />
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

            {
                user && 
                <Button 
                    title = 'Enviar pedido'
                    containerStyle = { styles.btnContainer }
                    buttonStyle = { styles.btnSendOrder }
                    onPress = { sendOrder }
                />
            }

            <ArticleModal 
                showArticleModal = { showArticleModal } 
                onChangeSetArticle={(e, type) => onChangeSetArticle(e, type)}
                addArticle = { addArticle }
                setShowArticleModal = { setShowArticleModal }
                article = { article }
            />

        

        <Loading isVisible = { isLoading } text = 'Enviando pedido' />
            
        </ScrollView>
    )
}

const ArticleModal = (props) => {
        
    const {
        showArticleModal,
        onChangeSetArticle,
        addArticle,
        setShowArticleModal,
        article
    } = props

    return (
        <Overlay isVisible={showArticleModal} onBackdropPress={() => setShowArticleModal(!showArticleModal)}>
            <View style = { styles.viewForm }>    
                <Input 
                    placeholder = 'Artículo'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleName') }
                />
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Kilogramo'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'kilogramo'}
                        onPress = { e => onChangeSetArticle('kilogramo', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Tira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'tira'}
                        onPress = { e => onChangeSetArticle('tira', 'articleWeightType') }
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Unidad'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'unidad'}
                        onPress = { e => onChangeSetArticle('unidad', 'articleWeightType') }
                    />
                </View>
                <Input 
                    placeholder = 'Cantidad'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleCount') }
                />
                <Button 
                    title = 'Agregar artículo'
                    containerStyle = { styles.btnAddArticle }
                    buttonStyle = { styles.btnSendOrder }
                    onPress = { () => addArticle() }
                />
            </View>
        </Overlay>
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
    btnOpenModalArticle: {
        backgroundColor: '#00a680',
        marginTop: 40,
        marginBottom: 20
    },
    btnOpenModalStyle: {
        backgroundColor: '#00a680'
    }
})