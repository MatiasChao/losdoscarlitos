import * as firebase from 'firebase'

export const reauthenticate = (password) => {
    const user = firebase.auth().currentUser; // obtiene el usuario actual logueado
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    ) // EmailAuthProvider nos devuelve las credenciales del user que le pasamos
    return user.reauthenticateWithCredential(credentials) // le pasamos las credenciales a la funcion para que las valide
}