import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseApp } from '../utils/firebase'

const db = firebase.firestore(firebaseApp)

export default function ArticleList({ route }) {

    const [articles, setArticles] = useState([])
    const [countArticles, setCountArticles] = useState(0)
    const [startArticles, setStartArticles] = useState(null)
    const limitArticles = 10

    const {
        state
    } = route.params
    
    /*
    useEffect(() => {
        db.collection('articles').get().then((snap) => {
            countArticles(snap.size)
        })

        const resultArticles = []
        db.collection('articles')
            .orderBy('createDate', 'desc')
            .limit(limitArticles)
            .get()
            .then(response => {
                setStartArticles(response.docs[response.docs.length -1])
                response.forEach((doc) => {
                    //console.log(doc.data())
                    //console.log(doc.id) // obtenemos el ID
                    const article = doc.data()
                    article.id = doc.id
                    console.log(article)
                    resultArticles.push(article)
                })
                setArticles(resultArticles)
            })

    }, [])
    */

    return(
        <View>
            <Text>ArticleList</Text>
            <Text>Ir agregando al carrito.... {state.name}</Text>
        </View>
    )
}