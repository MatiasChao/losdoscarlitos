import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {

    const navigation = useNavigation()
    console.log(navigation)

    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image 
                source={require("../../../assets/img/logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>
                Consulta tu cuenta de Los 2 Carlitos
            </Text>
            <Text style={styles.description}>
                Ponte en contacto con la administración para recibir tu cuenta
            </Text>
            <View style={styles.viewBtn}>
                <Button 
                    title="Ver tu cuenta"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 150,
        width: '100%',
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        marginBottom: 20
    },
    viewBtn: {
        flex: 1,
        alignItems: 'center'
    },
    btnStyle: {
        backgroundColor: '#00a680'
    },
    btnContainer: {
        width: '70%'
    }
})