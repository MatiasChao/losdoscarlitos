import React, { useEffect, useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'

import OrderListByUser from './OrderListByUser'
import Loading from '../components/Loading'

const db = firebase.firestore(firebaseApp)

export default function OrderList() {

    const [orders, setOrders] = useState([])
    const [countOrders, setCountOrders] = useState(0)
    const [startOrders, setStartOrders] = useState(null)
    const [userLogged, setUserLogged] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const limitOrders = 10

    firebase
    .auth()
    .onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            if(userLogged) {
                const idUser = firebaseApp.auth().currentUser.uid
                setIsLoading(true)
                getOrdersByUser(idUser)
            }
        }, [userLogged])
    )

    const getOrdersByUser = (idUser) => {
        const resultOrders = []

        db.collection('orders')
            .where('createById', '==', idUser)
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
                setIsLoading(false)
            })
    }

    // implementar
    const deleteOrder = async () => {
        try {
            await db.collection('orders').doc(id).delete()
            // mostrar mensaje que se borro satisfactoriamente
        } catch (error) {
            console.log("Hubo un error al eliminar")
        }

    }

    return(
        <View>
            {
                userLogged ?
                    orders.length > 0 ?
                        <OrderListByUser 
                            orders = { orders }
                        /> 
                        :
                        <Text> Aún no tienes pedidos </Text>
                :
                <View style={styles.textLoginView}>
                    <Text style={styles.loginText}>
                        Necesitas iniciar sesión para ver los pedidos enviados
                    </Text>
                </View>
            }

            <Loading isVisible = { isLoading } text = 'Obteniendo pedidos' />
        </View>
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