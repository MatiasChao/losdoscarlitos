import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { days, months } from '../utils/utils'

export default function OrderListByUser(props) {

    const {
        orders
    } = props

    const navigation = useNavigation()

    return (
        <View>
            {
                size(orders) > 0 ? 
                    <FlatList 
                        data = { orders }
                        renderItem = { (order) => <Order order = { order} navigation = { navigation } />}
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
    const { order, navigation } = props
    const { name, createDate } = order.item

    const goOrder = () => {
        navigation.navigate('editOrder', {
            order : order.item
        })
    } 

    const date = new Date(createDate.seconds*1000)

    return (
        <TouchableOpacity onPress = { goOrder }>
            <View style = { styles.viewOrder }>
                <Text>
                    <Text style={{fontWeight: 'bold'}}> { name } </Text> - { days[date.getDay()] } { date.getUTCDate() } { 'de' } { months[date.getMonth()] } { date.getHours() }:{ date.getMinutes() }{ date.getMinutes() && date.getMinutes() < 10 && '0' } 
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