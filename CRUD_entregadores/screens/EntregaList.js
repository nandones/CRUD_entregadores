import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

export default function EntregaList({ navigation, route }) {
  const entregadorId = route.params?.entregadorId;
  const [entregas, setEntregas] = useState([]);

  async function fetchEntregas() {
    try {
      let q = collection(db, 'entregas');
      if (entregadorId) {
        q = query(q, where('entregadorId', '==', entregadorId));
      }
      const snapshot = await getDocs(q);
      setEntregas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as entregas.');
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchEntregas);
    return unsubscribe;
  }, [navigation, entregadorId]);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, 'entregas', id));
      fetchEntregas();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir a entrega.');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Nova Entrega" onPress={() => navigation.navigate('Nova Entrega', { entregadorId })} />
      <FlatList
        data={entregas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Nova Entrega', { entrega: item })}
            style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.destinatario}</Text>
            <Text>Endereço: {item.endereco}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Entregador: {item.entregadorNome}</Text>
            <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}