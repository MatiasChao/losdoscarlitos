import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'
import { getDayFn } from '../utils/utils'

export default function OrderListByUser(props) {

    const {
        orders
    } = props

    return (
        <View>
            {
                size(orders) > 0 ? 
                    <FlatList 
                        data = { orders }
                        renderItem = { (order) => <Order order = { order} />}
                        keyExtractor = {(item, index) => index.toString()}
                    />
                    :
                    <View style = { styles.loaderOrders }>
                        <ActivityIndicator size="large" />
                        <Text>Cargando pedidos</Text>
                    </View>
            }
        </View>
    )
}

function Order(props) {
    const { order } = props
    const { name, createDate } = order.item
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

    const goOrder = () => {
        console.log("OK")
        // abrir pa editar
    } 

    const date = new Date(createDate.seconds*1000)

    return (
        <TouchableOpacity onPress = { goOrder }>
            <View style = { styles.viewOrder }>
                <Text>
                    { name }  { days[date.getDay()] } - { date.getHours() } : { date.getMinutes() }    
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderOrders: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    viewOrder: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'white',
        padding: 10
    }
})