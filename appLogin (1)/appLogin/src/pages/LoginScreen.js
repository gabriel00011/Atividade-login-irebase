import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

//IMPORT DO FIREBASE:
import firebase from 'firebase';

//CLASS COMPONENT DA TELA DE LOGIN:
export default class LoginScreen extends React.Component {

    /*RECEBER OS DADOS DIGITADOS DE EMAIL E SENHA
    
        1º CRIAR UMA STATE PARA GUARDAR OS DADOS DE EMAIL E SENHA
        2º CRIAR OS MÉTODOS DE CAPTURA DE EMAIL E SENHA
        3º FAZER A CHAMADA DOS MÉTODOS DE CAPTURA DE EMAIL E SENHA NOS CAMPOS DE TEXTO
        4º ESTABELECER A CONEXÃO COM O FIREBASE
        5º PROGRAMAR O MÉTODO DE LOGIN
        6º CHAMADA DO MÉTODO DE LOGIN NO BOTÃO
        7º IMPLEMENTANDO A PRIMEIRA VERSÃO DO LOGIN NO MÉTODO tryLogin
        8º IMPLEMENTANDO A CRIAÇÃO DE USUÁRIOS NÃO EXISTENTES
        9º NAVEGAR PARA A A TELA DE HOME DO APLICATIVO (USUÁRIO LOGADO)

    */

    //CONSTRUTOR DA CLASSE
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

    //MÉTODO DE LOGIN NO FIREBASE (TESTE DE STATE)
    tryLogin() {

        console.log(this.state);

        //IMPLEMENTAÇÃO DO CÓDIGO DE TENTATIVA DE LOGIN

        //TENTA REALIZAR UMM LOGIN NO FIREBASE
        try {

            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(response => {

                    console.log('USUÁRIO AUTENTICADO -> ', response.user);
                    //NAVEGAÇÃO PARA A TELA DE LOGADO (HOME DO APP)
                    //this.props.navigation.navigate('Home');
                    this.props.navigation.replace('Home');

                }).catch(error => {

                    console.log('ERRO DE AUTENTICAÇÃO', error.code)

                    if (error.code === 'auth/user-not-found') {

                        /*
                        
                            PARAMETROS DO MÉTODO alert DO COMPONENTE Alert
                        
                            1º PARAMETRO -> TITULO DA CAIXA DE ALERTA
                            2º PARAMETRO -> MENSAGEM DA CAIXA DE ALERTA
                            3º PARAMETRO -> ARRAY CONTENDO OS BOTÕES DE OPÇÃO
                                            OS BOTÕES DE OPÇÃO DA CAIXA DE ALERTA DEVEM SER REPRESENTADOS
                                            POR OBJETOS DE NOTAÇÃO JSON -> { atributo: valor }
                            4º PARAMETRO ->

                        */
                        Alert.alert(
                            'USUÁRIO NÃO ENCONTRADO',
                            'DESEJA CRIAR UM NOVO USUÁRIO COM OS DADOS INFORMADOS?',
                            [
                                //NÃO
                                {
                                    text: 'NÃO',
                                    onPress: () => { console.log('CLICOU NO NÃO!') }
                                },

                                //SIM
                                {//INICIO DO JSON DO BOTÃO SIM
                                    text: 'SIM',
                                    onPress: () => {//INICIO DA ARROW DE CRIAÇAO DO USUÁRIO
                                        console.log('CLICOU NO SIM!');
                                        firebase
                                            .auth()
                                            .createUserWithEmailAndPassword(this.state.email, this.state.password)
                                            .then(user => {

                                                console.log('USUÁRIO CRIADO COM SUCESSO->', user)
                                                //NAVEGAÇÃO PARA A TELA DE LOGADO (HOME DO APP)
                                                //this.props.navigation.navigate('Home');
                                                this.props.navigation.replace('Home');

                                            }).catch(error => {

                                                console.log('ERRO AO CRIAR USUÁRIO->', error)

                                            })


                                    }//FIM DA ARROW DE CRIAÇAO DO USUÁRIO

                                }//FIM DO JSON DO BOTÃO SIM
                            ]

                        );

                    }


                })

        }

        //TRATA UM ERRO DE TENTATIVA DE LOGIN
        catch (error) {

            console.log('ERRO NO TRY -> ', error);

        }

    }

    //INICIALIZA A CONXEXÃO COM O FIREBASE
    componentDidMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyCFqhNOXzmddwIhvGA84zL_cxx64ClxaeE",
            authDomain: "ds-pam1-gabriel.firebaseapp.com",
            projectId: "ds-pam1-gabriel",
            storageBucket: "ds-pam1-gabriel.appspot.com",
            messagingSenderId: "563057950593",
            appId: "1:563057950593:web:7c59957e2b37335323f280",
            measurementId: "G-L0XWTH0BCX"
        };

        if (firebase.apps.length === 0) {

            firebase.initializeApp(firebaseConfig);

        }

        //console.log(firebase);

    }

    render() {

        return (

            <View>

                {/* <Text>TESTE DE TELA DE LOGIN!!</Text> */}

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

                <Button title="ENTRAR" onPress={() => { this.tryLogin() }} />
                <Button title="Cadastrar" onPress={() => { this.props.navigation.navigate('Cadastro') }} />

            </View>

        )

    }

}

const styles = StyleSheet.create({

    input: {
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000'

    }

})