import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'
import OrderListByUser from './OrderListByUser'

const db = firebase.firestore(firebaseApp)

export default function OrderList() {

    const [orders, setOrders] = useState([])
    const [countOrders, setCountOrders] = useState(0)
    const [startOrders, setStartOrders] = useState(null)
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

    }, [])

    return(
        <View>
            <OrderListByUser 
                orders = { orders }
            />
        </View>
    )
}