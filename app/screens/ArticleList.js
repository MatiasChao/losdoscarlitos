import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text} from 'react-native-elements'
import { size, isEmpty, map }  from 'lodash'

export default function ArticleList({ route }) {

    const { listArticle } = route.params;

    console.log("QUE VIENE? ", listArticle)

    listArticle.map((a, idx) => {
        console.log("mostra", a.articleName)
    })

    return(
        <View>
            <Text h5 style={styles.textTitle}>Puedes ver o modificar los pedidos agregados</Text>
            {
                listArticle.map((a, idx) => (
                    <ListItem
                        key={idx}
                        title = { a.articleName }
                        leftIcon = {{ 
                            name: "pencil",
                            type: 'material-community'
                        }}
                        chevron
                        containerStyle = { styles.menuItem }
                            // on press tiene que abrir pa modificar
                            // tiene que llamar a ArticleModal
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    textTitle: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        paddingLeft: 30
    }
})