import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import { Input, Button, ListItem, Overlay, CheckBox, Icon } from 'react-native-elements'

import Loading from '../components/Loading'
import DropDownPicker from 'react-native-dropdown-picker'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'

import { products } from '../utils/constants'

const db = firebase.firestore(firebaseApp)

export default function EditOrder({ route }) {

    const [article, setArticle] = useState(null)
    const [order, setOrder] = useState(null)
    const [showArticleModal, setShowArticleModal] = useState(false)
    const [showEditArticleError, setShowEditArticleError] = useState(false)
    const [articlePosition, setArticlePosition] = useState(null)
    const [addNewArticle, setAddNewArticle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newArticle, setNewArticle] = useState({
        articleName: '',
        articleWeightType: '',
        articleCount: ''
    })
    const [messageUpdateOrder, setMessageUpdateOrder] = useState({
        message: '',
        status: '',
        view: false
    })

    useEffect(() => {
        setOrder(route.params.order)
    }, [])

    const defaultArticle = {
        articleName: '',
        articleWeightType: '',
        articleCount: ''
    }

    const editOrderFirebase = () => {
        setIsLoading(true)

        db.collection('orders').doc(id).update({
            "name" : order.name,
            "listArticle" : order.listArticle,
            "observation" : order.observation,
        })
        .then(
            console.log("Se actualizo"),
            setMessageUpdateOrder({
                ...messageUpdateOrder, 
                message: 'Se actualizó correctamente', 
                status: 'success',
                view: true
            })
        )
        .catch(() => {
            console.log("Fallo algo al actualizar"),
            setMessageUpdateOrder({
                ...messageUpdateOrder, 
                message: 'Algo falló al actualizar el pedido', 
                status: 'error',
                view: true
            })
        })

        setIsLoading(false)

            /*
            db.collection("orders").where("id", "==", id)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    // Build doc ref from doc.id
                    db.collection("orders").doc(doc.id).update(orderToEdit);
                });
            })
            .catch(() => {
                console.log("ERROR")
                //setIsLoading(false)
                //toastRef.current.show('Error al intentar guardar el pedido, intentelo nuevamente')
            })
            */
    }

    const showEditModalFn = (article, idx) => {
        setArticle(article)
        setShowArticleModal(true)
        setArticlePosition(idx)
        setAddNewArticle(false)
    }

    const saveEditedArticle = () => {
        if(addNewArticle) {
            order.listArticle.push(newArticle)
            setNewArticle(defaultArticle)
        }

        setShowArticleModal(false)
    }

    const onChangeOrder = (e, type) => {
        return setOrder({
            ...order, 
            [type]: e
        })
    }

    const onChangeArticleInOrderByPositionFn = (e, type) => {
        order.listArticle[articlePosition][type] = e
        return setOrder({
            ...order
        })
    }

    const onChangeNewArticleFn = (e, type) => {
        return setNewArticle({
            ...newArticle,
            [type]: e
        })
    }

    const deleteArticleFn = () => {
        order.listArticle.splice(articlePosition, 1)
        setShowArticleModal(false)
    }

    const addNewArticleFn = () => {
        setShowArticleModal(true)
        setArticle(defaultArticle)
        setAddNewArticle(true)
    }

    // si no es de hoy el pedido le escondo el boton de actualizar

    return (
        <SafeAreaView style={styles.containerScroll}>
            {
                order && 
                <ScrollView>
                    <Input 
                        placeholder = 'Nombre'
                        containerStyle = { styles.inputName }
                        onChange = { e => onChangeOrder(e.nativeEvent.text, 'name') }
                        defaultValue = { order.name }
                    />

                    <View style={styles.articleList}>
                        {
                            order.listArticle.length > 0 &&
                            <Text style={styles.articlesAddedListTitle}>Artículos agregados</Text>
                        }
                        
                        {
                            order.listArticle.map((a, idx) => (
                                <ListItem
                                    key={idx}
                                    title = { a.articleName + " - " + a.articleCount + " " + a.articleWeightType }
                                    leftIcon = {{ 
                                        name: "pencil",
                                        type: 'material-community'
                                    }}
                                    chevron
                                    containerStyle = { styles.menuItem }
                                    onPress = {() => showEditModalFn(a, idx)}
                                />
                            ))
                        }
                    </View>

                    <Button 
                        title = 'artículo'
                        containerStyle = { styles.btnAddArticleMain }
                        buttonStyle = { styles.btnSendOrder }
                        onPress = { addNewArticleFn }
                        icon={
                            <Icon
                            name="plus"
                            type="material-community"
                            size={23}
                            color="#fff"
                            />
                        }
                    />

                    <Input 
                        placeholder = 'Observacion'
                        containerStyle = { styles.inputName }
                        onChange = { e => onChangeOrder(e.nativeEvent.text, 'observation') }
                        defaultValue = { order.observation }
                    />
                    <Button 
                        title = 'Actualizar pedido'
                        containerStyle = { styles.btnContainer }
                        buttonStyle = { styles.btnSendOrder }
                        onPress = { editOrderFirebase }
                    />

                    {
                        messageUpdateOrder.view &&
                        <Text style = { messageUpdateOrder.status == 'success'? styles.messageSendOrderSuccess : styles.messageSendOrderError }>
                            {
                                messageUpdateOrder.message
                            }
                        </Text>
                    }

                    {
                        showArticleModal && 
                        <ArticleModal 
                            showArticleModal = { showArticleModal } 
                            setShowArticleModal = { setShowArticleModal }
                            article = { article }
                            saveEditedArticle = { saveEditedArticle }
                            showEditArticleError = { showEditArticleError }
                            onChangeOrder = {(e, type) => onChangeOrder(e, type)}
                            onChangeArticleInOrderByPositionFn = {(e, type) => onChangeArticleInOrderByPositionFn(e, type)}
                            deleteArticleFn = { deleteArticleFn }
                            addNewArticle = { addNewArticle }
                            onChangeNewArticleFn = { onChangeNewArticleFn }
                            newArticle = { newArticle }
                            setNewArticle = { setNewArticle }
                            products = { products }
                        />
                    }

                <Loading isVisible = { isLoading } text = 'Actualizando pedido' />
            </ScrollView>
            }
        </SafeAreaView>
    )
}

const ArticleModal = (props) => {
        
    const {
        showArticleModal,
        setShowArticleModal,
        article,
        saveEditedArticle,
        showEditArticleError,
        onChangeOrder,
        onChangeArticleInOrderByPositionFn,
        deleteArticleFn,
        addNewArticle,
        onChangeNewArticleFn,
        newArticle,
        setNewArticle,
        products
    } = props

    return (
        <Overlay isVisible={showArticleModal} onBackdropPress={() => setShowArticleModal(!showArticleModal)} overlayStyle = { styles.overlayContainer }>
            <View>   
                <View style = { styles.dropDown }>
                    <DropDownPicker
                        items = {
                            products
                        }
                        defaultValue = { !addNewArticle && article.articleName }
                        containerStyle = {{height: 40}}
                        style = {{backgroundColor: '#fafafa'}}
                        dropDownStyle = {{backgroundColor: '#fafafa'}}
                        onChangeItem = {item => addNewArticle? onChangeNewArticleFn(item.value, 'articleName') : onChangeArticleInOrderByPositionFn(item.value, 'articleName')}
                        searchable = { true }
                        searchablePlaceholder = "Buscar artículo..."
                        searchableError = { () => <Text> Artículo no encontrado </Text> } 
                        placeholder = "Selecciona un artículo"
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Kilo'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={ addNewArticle? newArticle.articleWeightType === 'kilogramos' : article.articleWeightType === 'kilogramos'}
                        onPress = { () => addNewArticle? onChangeNewArticleFn('kilogramos', 'articleWeightType') : onChangeArticleInOrderByPositionFn('kilogramos', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Tira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={ addNewArticle? newArticle.articleWeightType === 'tiras' : article.articleWeightType === 'tiras'}
                        onPress = { () => addNewArticle? onChangeNewArticleFn('tiras', 'articleWeightType') :  onChangeArticleInOrderByPositionFn('tiras', 'articleWeightType') }
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Unidad'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={ addNewArticle? newArticle.articleWeightType === 'unidades' : article.articleWeightType === 'unidades'}
                        onPress = { () => addNewArticle? onChangeNewArticleFn('unidades', 'articleWeightType') : onChangeArticleInOrderByPositionFn('unidades', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Ganchos'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={ addNewArticle? newArticle.articleWeightType === 'ganchos' : article.articleWeightType === 'ganchos'}
                        onPress = { () => addNewArticle? onChangeNewArticleFn('ganchos', 'articleWeightType') : onChangeArticleInOrderByPositionFn('ganchos', 'articleWeightType') }
                    />
                </View>
                <Input 
                    placeholder = 'Cantidad'
                    containerStyle = { styles.input }
                    defaultValue = { addNewArticle? newArticle.articleCount : article.articleCount }
                    onChange = { e => addNewArticle? onChangeNewArticleFn(e.nativeEvent.text, 'articleCount') : onChangeArticleInOrderByPositionFn(e.nativeEvent.text, 'articleCount') }
                />
                {
                    showEditArticleError && 
                    <Text style = { styles.textAddArticleError }>
                        Los campos no pueden ser vacios
                    </Text>
                }
                <Button 
                    title = { addNewArticle ? 'Agregar artículo' : 'Actualizar artículo' }
                    buttonStyle= { styles.btnStyle}
                    containerStyle = { styles.btnAddArticle }
                    onPress = { () => saveEditedArticle() }
                />

                {
                    !addNewArticle && 
                    <Button 
                        title = 'Eliminar artículo'
                        containerStyle = { styles.btnAddArticle }
                        buttonStyle = { styles.btnDeleteArticle }
                        onPress = { () => deleteArticleFn() }
                    />
                }
                   
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1
    },
    input: {
        marginBottom: 10
    },
    inputName: {
        marginBottom: 20,
        marginTop: 10
    },
    btnContainer: {
        marginTop: 50,
        width: '90%',
        marginLeft: '5%'
    },
    btnSendOrder: {
        backgroundColor: '#00a680'
    },
    btnAddArticleMain: {
        width: '26%',
        marginLeft: '10%',
        marginBottom: 10
    },
    articleList: {
        marginBottom: 20
    },
    articlesAddedListTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
        marginLeft: 10
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    checkbox: {
        backgroundColor: '#fff',
        width: 120
    },
    textAddArticleError: {
        color: 'red'
    },
    btnAddArticle: {
        marginTop: 10,
        width: '90%',
        marginLeft: '5%',
        marginBottom: 15
    },
    btnStyle: {
        backgroundColor: '#00a680'
    },
    overlayContainer: {
        width: '90%'
    },
    container: {
        flexDirection: 'row', 
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    btnDeleteArticle: {
        backgroundColor: '#EC5252'
    },
    dropDown: {
        marginTop: 10,
        marginBottom: 10,
        zIndex: 1000
    },
    messageSendOrderSuccess: {
        marginTop: 20,
        marginLeft: 70,
        color: 'green',
        fontSize: 15
    },
    messageSendOrderError: {
        marginTop: 20,
        marginLeft: 70,
        color: 'red',
        fontSize: 15
    }
})