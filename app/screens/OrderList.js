import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'

const db = firebase.firestore(firebaseApp)

export default function OrderList() {

    const [orders, setOrders] = useState([])
    const [countOrders, setCountOrders] = useState(0)
    const [startOrders, setStartOrders] = useState(null)
    const limitOrders = 10
    
    useEffect(() => {
        db.collection('orders').get().then((snap) => {
            countOrders(snap.size)
        })

        const resultOrders = []
        db.collection('orders')
            .orderBy('createDate', 'desc')
            .limit(limitOrders)
            .get()
            .then(response => {
                setStartOrders(response.docs[response.docs.length -1])
                response.forEach((doc) => {
                    //console.log(doc.data())
                    //console.log(doc.id) // obtenemos el ID
                    const order = doc.data()
                    order.id = doc.id
                    console.log(order)
                    resultOrders.push(order)
                })
                setOrders(resultOrders)
            })

    }, [])

    return(
        <View>
            <Text>ArticleList</Text>
            <Text>Ir agregando al carrito....</Text>
        </View>
    )
}