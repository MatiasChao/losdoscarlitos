import React, { useState } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import * as firebase from 'firebase'
import { validateEmail } from '../../utils/validations'
import Loading from '../Loading'

export default function LoginForm (props) {

    const { toastRef } = props

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormDataValue())
    const [loading, setLoading] = useState(false)
    const nagivation = useNavigation()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? '70%' : 0

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text.toLowerCase() })
    }

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show('Todos los campos son obligatorios')
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto')
        } else {
            setLoading(true)
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    setLoading(false)
                    nagivation.navigate('account')
                })
                .catch(() => {
                    setLoading(false)
                    toastRef.current.show('Email o contraseña incorrecta')
                })
        }
    }

    return (
        // <Overlay avoidKeyboard={true} overlayStyle={{ height: keyboardVerticalOffset}}>
        //     <KeyboardAwareScrollView>   
                <View style={styles.formContainer}>
                    <Input
                        placeholder = 'Correo electronico'
                        containerStyle = { styles.inputForm }
                        onChange = { e => onChange(e, 'email') }
                        rightIcon = { 
                            <Icon 
                                type = 'material-community'
                                name = 'at' 
                                iconStyle = { styles.iconRight }
                            />
                        }
                    />
                    <Input 
                        placeholder = 'Contraseña'
                        containerStyle = { styles.inputForm }
                        password = { true }
                        secureTextEntry = { showPassword ? false : true }
                        onChange = { e => onChange(e, 'password') }
                        rightIcon = { 
                            <Icon 
                                type = 'material-community'
                                name = { showPassword ? 'eye-off-outline' : 'eye-outline' }
                                iconStyle = { styles.iconRight }
                                onPress = { () => setShowPassword(!showPassword) }
                            />
                        }
                    />
                    <Button 
                        title = 'Iniciar sesión'
                        containerStyle = { styles.btnContainerLogin }
                        buttonStyle = { styles.btnLogin }
                        onPress = { onSubmit }
                    />
                    <Loading 
                        isVisible = { loading } 
                        text = 'Iniciando sesión'
                    />
                </View>
        //     </KeyboardAwareScrollView>
        // </Overlay>
    )
}

function defaultFormDataValue() {
    return {
        email: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputForm: {
        width: '100%',
        marginTop: 20
    },
    btnContainerLogin: {
        marginTop: 20,
        width: '95%'
    },
    btnLogin: {
        backgroundColor: '#00a680'
    },
    iconRight: {
        color: '#c1c1c1'
    }
})