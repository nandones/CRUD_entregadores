import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

export default function EntregadorList({ navigation }) {
  const [entregadores, setEntregadores] = useState([]);

  async function fetchEntregadores() {
    try {
      const snapshot = await getDocs(collection(db, 'entregadores'));
      setEntregadores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os entregadores.');
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchEntregadores);
    return unsubscribe;
  }, [navigation]);

  async function handleDelete(id) {
    try {
      // Excluir entregas relacionadas
      const entregasRef = collection(db, 'entregas');
      const q = query(entregasRef, where('entregadorId', '==', id));
      const snapshot = await getDocs(q);
      const batchDeletes = snapshot.docs.map(d => deleteDoc(doc(db, 'entregas', d.id)));
      await Promise.all(batchDeletes);

      // Excluir entregador
      await deleteDoc(doc(db, 'entregadores', id));
      fetchEntregadores();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir o entregador.');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Novo Entregador" onPress={() => navigation.navigate('Novo Entregador')} />
      <FlatList
        data={entregadores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Novo Entregador', { entregador: item })}
            style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Status: {item.status}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Button title="Entregas" onPress={() => navigation.navigate('Entregas', { entregadorId: item.id })} />
              <View style={{ width: 8 }} />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}