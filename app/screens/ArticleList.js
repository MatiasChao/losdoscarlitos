import React, { useState } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { ListItem, Text, Overlay, Input, CheckBox, Button} from 'react-native-elements'
import { size, isEmpty, map }  from 'lodash'
import { useNavigation } from '@react-navigation/native'
import ModalTest from '../modals/ModalTest'

export default function ArticleList({ route }) {

    const { 
        setState,
        state
    } = route.params;

    const nagivation = useNavigation()
    const [showArticleModal, setShowArticleModal] = useState(false) // es el que muestra el modal del articulo
    const [showAddArticleError, setShowAddArticleError] = useState(false) // muestra mensaje de error si tiene campo vacio
    const [positionArticle, setPositionArticle] = useState(null)

    const defaultArticle = {
        articleName: '',
        articleWeightType: '',
        articleCount: ''
    }

    const [article, setArticle] = useState({
        articleName: '',
        articleWeightType: '',
        articleCount: ''
    })

    // esta funcion se llama del listado de articulos (cuando cliqueamos uno)
    const showEditModalFn = (article, idx) => {
        setArticle(article)
        setShowArticleModal(true)
        console.log("positionArticle: ", idx)
        setPositionArticle(idx)
    }

    // click en add article ( abre modal )
    const showArticleModalFn = () => {
        setArticle(defaultArticle)
        setShowArticleModal(true)
        setShowAddArticleError(false)
    }

    // metodo que agrega los articulos ala lista
    const onChangeListArticles = (e) => {
        state.listArticle.push(e)
        return setState({
            ...state, 
        }) 
    }

    // cambia el valor a los campos del articulo
    const onChangeSetArticle = (e, type) => {
        return setArticle({
            ...article, 
            [type]: e
        })
    }

    const addArticle = () => {

        if(article.articleName === '' || article.articleWeightType === '' || article.articleCount === '') {
            setShowAddArticleError(true)
        } else {
            if(positionArticle !== null) {
                state.listArticle[positionArticle] = article
            } else {
                onChangeListArticles(article)
            }
            setShowArticleModal(false)
            setArticle(defaultArticle)
            setPositionArticle(null)
        }
    }

    return(
        <View>
            <Text h5 style={styles.textTitle}>Puedes ver o modificar los artículos agregados</Text>

            <ListItem
                    title = { 'Agregar artículo' }
                    leftIcon = {{ 
                        name: "plus",
                        type: 'material-community'
                    }}
                    chevron
                    containerStyle = { styles.menuItem }
                    onPress = { () => showArticleModalFn() }
                />

            <View style={styles.articleList}>
                {
                    state.listArticle.length > 0 &&
                    <Text style={styles.articlesAddedListTitle}>Artículos agregados</Text>
                }
                
                {
                    state.listArticle.map((a, idx) => (
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

            <ArticleModal 
                showArticleModal = { showArticleModal } 
                onChangeSetArticle = {(e, type, idx) => onChangeSetArticle(e, type, idx)}
                addArticle = { addArticle }
                setShowArticleModal = { setShowArticleModal }
                article = { article }
                showAddArticleError = { showAddArticleError }
            />
        
        </View>
    )
}

const ArticleModal = (props) => {
        
    const {
        showArticleModal,
        onChangeSetArticle,
        addArticle,
        setShowArticleModal,
        article,
        showAddArticleError
    } = props

    return (
        <Overlay isVisible={showArticleModal} onBackdropPress={() => setShowArticleModal(!showArticleModal)}>
            <View style = { styles.viewForm }>    
                <Input 
                    placeholder = 'Artículo'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleName') }
                    defaultValue = { article.articleName }
                />
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Kilogramos'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'kilogramos'}
                        onPress = { () => onChangeSetArticle('kilogramos', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Tiras'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'tiras'}
                        onPress = { () => onChangeSetArticle('tiras', 'articleWeightType') }
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Unidades'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'unidades'}
                        onPress = { () => onChangeSetArticle('unidades', 'articleWeightType') }
                    />
                </View>
                <Input 
                    placeholder = 'Cantidad'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleCount') }
                    defaultValue = { article.articleCount }
                />
                {
                    showAddArticleError && 
                    <Text style = { styles.textAddArticleError }>
                        Los campos no pueden ser vacios
                    </Text>
                }
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
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    textTitle: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        paddingLeft: 30
    },
    articleList: {
        marginTop: 30
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
    btnSendOrder: {
        backgroundColor: '#00a680'
    },
    input: {
        marginBottom: 10
    },
    textAddArticleError: {
        color: 'red',
        paddingLeft: 20,
        paddingBottom: 5
    },
    articlesAddedListTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
        marginLeft: 60
    }
})