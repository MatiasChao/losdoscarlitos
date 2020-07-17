import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'
import OrderListByUser from './OrderListByUser'

const db = firebase.firestore(firebaseApp)

export default function OrderList() {

    const [orders, setOrders] = useState([])
    const [countOrders, setCountOrders] = useState(0)
    const [startOrders, setStartOrders] = useState(null)
    const [user, setUser] = useState(null)
    const limitOrders = 10
    
    // implementar
    const deleteOrder = async () => {
        // poder eliminar pedidos con fecha de hoy?
        try {
            await db.collection('orders').doc(id).delete()
            // mostrar mensaje que se borro satisfactoriamente
        } catch (error) {
            console.log("Hubo un error al eliminar")
        }

    }

    useEffect(() => {
        // sacar esto para función
        db.collection('orders').get().then((snap) => {
            setCountOrders(snap.size)
        })

        const resultOrders = []

        db.collection('orders')
            .orderBy('createDate', 'desc')
            .limit(limitOrders)
            .get()
            .then(response => {
                setStartOrders(response.docs[response.docs.length -1])
                response.forEach((doc) => {
                    const order = doc.data()
                    order.id = doc.id
                    resultOrders.push(order)
                })
                setOrders(resultOrders)
            })

            // sacar esto para función
            firebase
            .auth()
            .onAuthStateChanged((userInfo) => {
                setUser(userInfo)
            })
    }, [])

    return(
        <ScrollView>
            {
                user?
                <OrderListByUser 
                    orders = { orders }
                /> :
                <View style={styles.textLoginView}>
                    <Text style={styles.loginText}>
                        Necesitas iniciar sesión para ver los pedidos enviados
                    </Text>
                </View>
            }
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textLoginView: {
        marginTop: '50%',
        alignItems: 'center'
    },
    loginText: {
        color: '#00a680',
        fontWeight: 'bold',
        width: 250,
        textAlign: 'center'
    }
})