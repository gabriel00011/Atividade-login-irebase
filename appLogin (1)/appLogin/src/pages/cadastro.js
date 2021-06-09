import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import firebase from 'firebase';



export default class TelaCadastro extends React.Component {
    constructor(props) {

        //PASSA A PROPS DE LOGINSCREEN PARA O CONSTRUTOR DE COMPONENT
        super(props);

        //CRIAÇÃO DA STATE QUE RECEBE OS DADOS DE EMAIL E SENHA
        this.state = {

            email: '',
            password: ''

        }

        // Object {
        //     "email": "teste@gmail.com",
        //     "password": "123456",
        //   }

    }

    //MÉTODO DE CAPTURA DE E-MAIL:
    onChangeEmail(value) {

        this.setState({

            email: value

        })

    }

    //MÉTODO DE CAPTURA DE SENHA:
    onChangePassword(value) {

        this.setState({

            password: value

        })

    }

    Cadastro() {

        console.log('CLICOU NO SIM!');
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {

                console.log('USUÁRIO CRIADO COM SUCESSO->', user)
                //NAVEGAÇÃO PARA A TELA DE LOGADO (HOME DO APP)
                //this.props.navigation.navigate('Home');
                this.props.navigation.navigate('Home');

            }).catch(error => {

                console.log('ERRO AO CRIAR USUÁRIO->', error)

            })

        //FIM DA ARROW DE CRIAÇAO DO USUÁRIO
    }



    render() {


        return (

            <View>

                <Text>TELA DE INICIO DO APP - USUÁRIO LOGADO!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="seuemail@gmail.com"
                    onChangeText={value => {

                        this.onChangeEmail(value);
                        //console.log(value);

                    }
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder="******"
                    secureTextEntry
                    onChangeText={value => {

                        this.onChangePassword(value);
                        //console.log(value);
                    }
                    }
                />
                <Button title="Cadastrar" onPress={() => this.Cadastro()} />
                <Text>{this.state.email}{this.state.password}</Text>
            </View>

        );

    }

}

const styles = StyleSheet.create({

    input: {
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000'

    }

})