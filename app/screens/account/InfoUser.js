import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function InfoUser(props) {

    const {
        userInfo: { photoUrl, displayName, email }
    } = props

    return ( 
        <View style = { styles.viewUserInfo }>
            <Avatar 
                rounded 
                size = 'large'
                showEditButton 
                containerStyle = { styles.userInfoAvatar }
                source = { 
                    photoUrl ? { url: photoUrl } :
                    require('../../../assets/img/avatar.jpg')
                }
            /> 
            <View >
            <Text style = { styles.displayName }>
                { displayName ? displayName : 'Anónimo' }
            </Text> 
            <Text >
                { email ? email : 'Social Login' }
            </Text> 
        </View > 
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    }
})