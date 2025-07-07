import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Picker, Text } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';

export default function EntregaForm({ navigation, route }) {
  const entrega = route.params?.entrega;
  const entregadorIdParam = route.params?.entregadorId;
  const [destinatario, setDestinatario] = useState(entrega?.destinatario || '');
  const [endereco, setEndereco] = useState(entrega?.endereco || '');
  const [status, setStatus] = useState(entrega?.status || '');
  const [data, setData] = useState(entrega?.data || '');
  const [entregadorId, setEntregadorId] = useState(entrega?.entregadorId || entregadorIdParam || '');
  const [entregadores, setEntregadores] = useState([]);

  useEffect(() => {
    async function fetchEntregadores() {
      const snapshot = await getDocs(collection(db, 'entregadores'));
      setEntregadores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchEntregadores();
  }, []);

  async function handleSave() {
    if (!destinatario || !endereco || !status || !data || !entregadorId) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    try {
      const entregador = entregadores.find(e => e.id === entregadorId);
      const entregaData = {
        destinatario,
        endereco,
        status,
        data,
        entregadorId,
        entregadorNome: entregador?.nome || '',
      };
      if (entrega) {
        await updateDoc(doc(db, 'entregas', entrega.id), entregaData);
      } else {
        await addDoc(collection(db, 'entregas'), entregaData);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Destinatário" value={destinatario} onChangeText={setDestinatario} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text style={{ marginBottom: 4 }}>Entregador:</Text>
      <Picker
        selectedValue={entregadorId}
        onValueChange={setEntregadorId}
        style={{ borderWidth: 1, marginBottom: 8 }}
      >
        <Picker.Item label="Selecione o entregador" value="" />
        {entregadores.map(e => (
          <Picker.Item key={e.id} label={e.nome} value={e.id} />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}