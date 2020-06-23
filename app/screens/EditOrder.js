import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button, ListItem, Overlay, CheckBox } from 'react-native-elements'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'

const db = firebase.firestore(firebaseApp)

export default function EditOrder({ route }) {

    const [article, setArticle] = useState(null)
    const [order, setOrder] = useState(null)
    const [showArticleModal, setShowArticleModal] = useState(false)
    const [showEditArticleError, setShowEditArticleError] = useState(false)
    const [articlePosition, setArticlePosition] = useState(null)

    const { 
        id,
        name, 
        listArticle,
        observation,
        createDate,
        createBy
    } = route.params.order 

    const orderToEdit = {
        name: name,
        listArticle: listArticle,
        observation: observation,
        createDate: createDate, // acá podriamos mandar la hora que actualizo
        createBy: createBy
    }

    const editOrderFirebase = () => {
        //setIsLoading(true)

        console.log("ID: ", id)

        console.log("Actualizar nombre: ", name)
        console.log("Actualizar pedidos: ", listArticle)
        console.log("Actualizar observation: ", observation)

        /*
        db.collection('orders').doc(id).update({
            "name" : name,
            "listArticle" : listArticle,
            "observation" : observation,
        })
        .then(
            console.log("Se actualizo")
        )
        .catch(() => {
            console.log("Fallo algo al actualizar")
        })
        */

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
        setOrder(orderToEdit)
        setArticle(article)
        setShowArticleModal(true)
        setArticlePosition(idx)
    }

    const saveEditedArticle = () => {
        console.log("ORDEN ACTUALIZADA: ", order)
    }

    const onChangeOrder = (e, type) => {
        return setOrder({
            ...order, 
            [type]: e
        })
    }

    const onChangeArticleInOrderByPositionFn = (e, type) => {
        //console.log("articlePosition: ", articlePosition)
        //console.log("Que muestra? -> ", article)
        //console.log("listArticle: ", listArticle[articlePosition])
        //console.log("BARCELONA: " , listArticle[articlePosition][type])
        listArticle[articlePosition][type] = e
        return setOrder({
            ...order
        })
    }

    return (
        <View>
            <Input 
                    placeholder = 'Nombre'
                    containerStyle = { styles.inputName }
                    onChangeOrder = { e => onChangeOrder(e.nativeEvent.text, 'name') }
                    defaultValue = { name }
            />

            <View style={styles.articleList}>
                {
                    listArticle.length > 0 &&
                    <Text style={styles.articlesAddedListTitle}>Artículos agregados</Text>
                }
                
                {
                    listArticle.map((a, idx) => (
                        <ListItem
                            key={idx}
                            title = { a.articleName }
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

            <Input 
                    placeholder = 'Observacion'
                    containerStyle = { styles.inputName }
                    onChangeOrder = { e => onChangeOrder(e.nativeEvent.text, 'observation') }
                    defaultValue = { observation }
            />
            <Button 
                title = 'Actualizar pedido'
                containerStyle = { styles.btnContainer }
                buttonStyle = { styles.btnSendOrder }
                onPress = { editOrderFirebase }
            />

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
                />
            }

        </View>
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
        onChangeArticleInOrderByPositionFn
    } = props

    //console.log("BRAZIL -> ", props)
    //console.log("URUGUAY -> ", article)

    return (
        <Overlay isVisible={showArticleModal} onBackdropPress={() => setShowArticleModal(!showArticleModal)} overlayStyle = { styles.overlayContainer }>
            <View>    
                <Input 
                    placeholder = 'Artículo'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeArticleInOrderByPositionFn(e.nativeEvent.text, 'articleName') }
                    defaultValue = { article.articleName }
                />
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Kilo'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'kilogramos'}
                        onPress = { () => onChangeArticleInOrderByPositionFn('kilogramos', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Tira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'tiras'}
                        onPress = { () => onChangeArticleInOrderByPositionFn('tiras', 'articleWeightType') }
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Unidad'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'unidades'}
                        onPress = { () => onChangeArticleInOrderByPositionFn('unidades', 'articleWeightType') }
                    />
                </View>
                <Input 
                    placeholder = 'Cantidad'
                    containerStyle = { styles.input }
                    defaultValue = { article.articleCount }
                    onChange = { e => onChangeArticleInOrderByPositionFn(e.nativeEvent.text, 'articleCount') }
                />
                {
                    showEditArticleError && 
                    <Text style = { styles.textAddArticleError }>
                        Los campos no pueden ser vacios
                    </Text>
                }
                <Button 
                    title = 'Actualizar artículo'
                    buttonStyle= { styles.btnStyle}
                    containerStyle = { styles.btnAddArticle }
                    onPress = { () => saveEditedArticle() }
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
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
})