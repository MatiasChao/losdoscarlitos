import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'
import { reauthenticate } from '../../utils/api'
import { size } from 'lodash'

export default function ChangePasswordForm (props) { 

    const { setShowModal, toastRef } = props
    const [showPassword, setShowPassword] = useState(false) 
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        repeatNewPassword: ''
    }) // esto tambien puede ir en una funcion
    const [errors, setErrors] = useState({}) 
    const [isLoading, setIsLoading] = useState(false) 

    const onChange = (e, type) => {
        return setFormData({
            ...formData, 
            [type]: e.nativeEvent.text
        })
    }

    const onSubmit = async () => {

        let isSetError = true
        let errorsTemp = {}
        setErrors({})

        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
            errorsTemp = {
                password: !formData.password ? 'La contraseña no puede estar vacia.' : '',
                newPassword: !formData.newPassword ? 'La contraseña no puede estar vacia.' : '',
                repeatNewPassword: !formData.repeatNewPassword ? 'La contraseña no puede estar vacia.' : '',
            }
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            errorsTemp = {
                newPassword: 'La contraseñas no son iguales.',
                repeatNewPassword: 'La contraseñas no son iguales.'
            }
        } else if (size(formData.newPassword) < 6) {
            errorsTemp = {
                newPassword: 'La contraseñas tiene que ser mayor a 5 caracteres.',
                repeatNewPassword: 'La contraseñas tiene que ser mayor a 5 caracteres.'
            }
        } else {
            setIsLoading(true)
            await reauthenticate(formData.password)
                    .then(async () => {
                        await firebase
                            .auth()
                            .currentUser.updatePassword(formData.newPassword)
                            .then(() => {
                                isSetError = false
                                setIsLoading(false)
                                setShowModal(false)
                                firebase.auth().signOut()
                            })
                            .catch(() => {
                                errorsTemp = {
                                    other: 'Error al actualizar la contraseña'
                                }
                                setIsLoading(false)
                            })
                    }).catch(() => {
                        console.log("Error")
                        errorsTemp = {
                            password: 'La contraseña no es correcta.'
                        }
                        setIsLoading(false)
                    })
        }

        isSetError && setErrors(errorsTemp)
    }

    return (
        <View style = { styles.view }>
            <Input 
                placeholder = 'Contraseña actual'
                containerStyle = { styles.input }
                password = { true }
                secureTextEntry = { showPassword ? false : true}
                onChange = { e => onChange(e, 'password') }
                rightIcon = {{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPresss: () => setShowPassword(!showPassword)
                }}
                errorMessage = { errors.password }
            />
            <Input 
                placeholder = 'Nueva contraseña'
                containerStyle = { styles.input }
                password = { true }
                secureTextEntry = { showPassword ? false : true}
                onChange = { e => onChange(e, 'newPassword') }
                rightIcon = {{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPresss: () => setShowPassword(!showPassword)
                }}
                errorMessage = { errors.newPassword }
            />
             <Input 
                placeholder = 'Repetir nueva contraseña'
                containerStyle = { styles.input }
                password = { true }
                secureTextEntry = { showPassword ? false : true}
                onChange = { e => onChange(e, 'repeatNewPassword') }
                rightIcon = {{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPresss: () => setShowPassword(!showPassword)
                }}
                errorMessage = { errors.repeatNewPassword }
            />
            <Button 
                title = 'Cambiar contraseña'
                containerStyle = { styles.btnContainer }
                buttonStyle = { styles.btn }
                onPress = { onSubmit }
                loading = { isLoading }
            />
            <Text>
                { errors.other }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
})