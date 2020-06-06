import React, { useState } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { ListItem, Text} from 'react-native-elements'
import { size, isEmpty, map }  from 'lodash'
import { useNavigation } from '@react-navigation/native'
import ModalTest from '../modals/ModalTest'

export default function ArticleList({ route }) {

    const { listArticle } = route.params;
    const nagivation = useNavigation()
    const [showEditModal, setShowEditModal] = useState(false)
    const [articleToEdit, setArticleToEdit] = useState(null)

    const showEditModalFn = (article) => {
        setArticleToEdit(article)
        setShowEditModal(true)
    }

    return(
        <View>
            <Text h5 style={styles.textTitle}>Puedes ver o modificar los artículos agregados</Text>
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
                            // on press tiene que abrir pa modificar
                            // tiene que llamar a ArticleModal
                            // tengo que abrir el modal...
                        onPress = {() => showEditModalFn(a)}
                    />
                ))
            }

            {
                showEditModal && 
                <ModalTest
                    article = { articleToEdit }
                    show = { showEditModal }
                    setShowEditModal = { setShowEditModal }
                />
            }
            
        </View>
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
    }
})