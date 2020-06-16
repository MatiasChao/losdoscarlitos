import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Overlay, Input } from 'react-native-elements'

export default function ModalTest (props) {
        
    const {
        article,
        show,
        setShowEditModal,
        onChangeSetArticle
    } = props

    console.log("props --->", props)

    console.log("article ----> ", article)
    console.log("show ----> ", show)

    return (
        <Overlay isVisible = {show} onBackdropPress={() => setShowEditModal(!show)}>
           <View>
                <Text>
                    Mostrar alguna variable de la pantalla Order
                </Text>
                <Input 
                    placeholder = 'Artículo'
                    defaultValue = { article.articleName }
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleName') }
                />
           </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    },
})