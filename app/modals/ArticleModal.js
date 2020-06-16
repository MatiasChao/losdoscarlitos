import React from 'react'
import { StyleSheet } from 'react-native'

export default function ArticleModal (props) {
        
    const {
        showArticleModal,
        onChangeSetArticle,
        addArticle,
        setShowArticleModal,
        article,
        showAddArticleError
    } = props
 
    return (
        <Overlay isVisible={showArticleModal} onBackdropPress={() => setShowArticleModal(!showArticleModal)}>
            <View style = { styles.viewForm }>    
                <Input 
                    placeholder = 'Artículo'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleName') }
                />
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Kilogramo'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'kilogramo'}
                        onPress = { e => onChangeSetArticle('kilogramo', 'articleWeightType') }
                    />
                    <CheckBox
                        center
                        title='Tira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'tira'}
                        onPress = { e => onChangeSetArticle('tira', 'articleWeightType') }
                    />
                </View>
                <View style = { styles.container }>
                    <CheckBox
                        center
                        title='Unidad'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle = { styles.checkbox }
                        checked={article.articleWeightType === 'unidad'}
                        onPress = { e => onChangeSetArticle('unidad', 'articleWeightType') }
                    />
                </View>
                <Input 
                    placeholder = 'Cantidad'
                    containerStyle = { styles.input }
                    onChange = { e => onChangeSetArticle(e.nativeEvent.text, 'articleCount') }
                />
                {
                    showAddArticleError && 
                    <Text style = { styles.textAddArticleError }>
                        Los campos no pueden ser vacios
                    </Text>
                }
                <Button 
                    title = 'Agregar artículo'
                    containerStyle = { styles.btnAddArticle }
                    buttonStyle = { styles.btnSendOrder }
                    onPress = { () => addArticle() }
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    
})