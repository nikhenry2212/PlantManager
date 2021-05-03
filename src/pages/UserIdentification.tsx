import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView,TouchableWithoutFeedback, Platform,Keyboard, Alert } from 'react-native';

import { Button } from './../components/Button';


import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  
  const navigation =  useNavigation();
  const [isFocused, setIsfocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  function handleInputBlur() {
    setIsfocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocus() {
    setIsfocused(true)

  }
  function handleInputChanged(value: string){
    setIsFilled(!!value);
    setName(value);
  }
  async function handleSubmit() {
    //Function pra salvar dados no storage no phone;
    //Name
    if(!name)
      return Alert.alert('Me diz como chamar você 😥');

      try{
        await  AsyncStorage.setItem('@plantmanager:user', name);  
        navigation.navigate('Confirmation', {
          title: 'Prontinho',
          subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'PlantSelect'

        })
      }catch{
        Alert.alert('Não foi possivel salvar seu nome. 😥');
      }


  }

  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>
                {isFilled ? '🙉' : '🙈'}
               </Text>
              <Text style={styles.title}>
                Como podemos {'\n'} chamar você?
                </Text>
            </View>
            <TextInput style={[
              styles.input,
              (isFocused || isFilled) && {borderColor: colors.green}
            ]}
              placeholder="Digite seu nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChanged}
            />

            <View style={styles.footer}>
              <Button 
              title="Confimar"
              onPress={handleSubmit}
              />

            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'

  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})