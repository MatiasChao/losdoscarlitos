import React from 'react'
import { Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function ModalTest (props) {
        
    const {
        article,
        show,
        setShowEditModal
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
           </View>
        </Overlay>
    )
}
