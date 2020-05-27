import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { map } from 'lodash'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'

export default function AccountOptions (props) {

    const { userInfo, toastRef } = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    
    const selectedComponent = (key) => {
        switch (key) {
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm 
                        displayName = { userInfo.displayName }
                        setShowModal = { setShowModal }
                        toastRef = { toastRef }
                    />
                )
                setShowModal(true)
                break
            case 'email':
                setRenderComponent(
                    <Text>Cambiando email</Text>
                )
                setShowModal(true)
                break
            case 'password':
                setRenderComponent(
                    <Text>Cambiando password</Text>
                )
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
        }
    }

    const menuOptions = generateMenuOptions(selectedComponent)

    return(
        <View>
            {
                map(menuOptions, (menu, idx) => (
                    <ListItem
                        key = { idx }
                        title = { menu.title }
                        leftIcon = {{ 
                            type: menu.iconType, 
                            name: menu.iconNameLeft, 
                            color: menu.iconColorLeft 
                        }}
                        chevron
                        containerStyle = { styles.menuItem }
                        onPress = { menu.onPress }
                    />
                ))
            }
            {
                renderComponent && 
                <Modal isVisible = { showModal } setIsVisible = { setShowModal }>
                    { renderComponent }
                </Modal>
            }
        </View>
    )
}

const generateMenuOptions = (selectedComponent) => {
    return [
        {
            title: 'Cambiar nombre y apellido',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ccc',
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Cambiar email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ccc',
            onPress: () => selectedComponent('email')
        },
        {
            title: 'Cambiar contraseña',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ccc',
            onPress: () => selectedComponent('password')
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})