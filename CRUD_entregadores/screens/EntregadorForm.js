import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function EntregadorForm({ navigation, route }) {
  const entregador = route.params?.entregador;
  const [nome, setNome] = useState(entregador?.nome || '');
  const [telefone, setTelefone] = useState(entregador?.telefone || '');
  const [cpf, setCpf] = useState(entregador?.cpf || '');
  const [status, setStatus] = useState(entregador?.status || '');

  async function handleSave() {
    if (!nome || !telefone || !cpf || !status) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    try {
      if (entregador) {
        await updateDoc(doc(db, 'entregadores', entregador.id), { nome, telefone, cpf, status });
      } else {
        await addDoc(collection(db, 'entregadores'), { nome, telefone, cpf, status });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}