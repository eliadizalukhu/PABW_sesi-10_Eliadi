import { View, Text, TextInput, Pressable, FlatList, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';

interface salad {
  id: number;
  title: string;
  statue: boolean;
}

const Search = () => {
  const [title, setTitle] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // Menambahkan state untuk pencarian
  const [salad, setsalad] = useState<salad[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<string>('');

  // Animasi untuk gambar yang berputar
  const rotateAnim = useState(new Animated.Value(0))[0];
  
  // Animasi untuk teks "Add a new salad"
  const textAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Menambahkan animasi rotasi untuk gambar
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000, // Durasi rotasi (4 detik)
        useNativeDriver: true,
      })
    );
    rotate.start();

    // Menambahkan animasi fade-in untuk teks
    Animated.timing(textAnim, {
      toValue: 1,
      duration: 2000, // Durasi fade-in (2 detik)
      useNativeDriver: true,
    }).start();

    return () => rotate.stop();
  }, [rotateAnim]);

  const handleAdd = () => {
    if (title.trim() === '') {
      return;
    }

    const newToDo = {
      id: Date.now(),
      title: title,
      statue: false,
    };

    setsalad(prev => [...prev, newToDo]);

    setTitle('');
  };

  const handleDelete = (deleteId: number) => {
    if (deleteId !== 0) {
      const updatesalad = salad.filter(item => item.id !== deleteId);
      setsalad(updatesalad);
    }
    return;
  };

  const handleEdit = () => {
    if (editTitle.trim() === '') {
      return;
    } else {
      setsalad(prev =>
        prev.map(item =>
          item.id === editId ? { ...item, title: editTitle } : item,
        ),
      );

      setEditId(0);
      setEditTitle('');
    }
  };

  const handleStartEdit = (editId: number, currentTitle: string) => {
    setEditId(editId);
    setEditTitle(currentTitle);
  };

  // Menyaring salad berdasarkan query pencarian
  const filteredSalads = salad.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFBF00', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' }}>
      Temukan solusi terbaik untuk kebutuhan Anda
      </Text>

      {/* Gambar berputar keliling dan berada di tengah */}
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Animated.Image
          source={{ uri: 'https://citrariasya.wordpress.com/wp-content/uploads/2016/09/evidence-search.jpg' }} // Ganti dengan URL gambar Anda
          style={{
            width: 80,
            height: 90,
            transform: [
              { rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }
            ],
          }}
        />
      </View>

      {/* Animasi pada teks "Add a new salad" */}
      <Animated.Text
        style={{
          fontSize: 16,
          color: '#333',
          fontWeight: '600',
          marginBottom: 10,
          textAlign: 'center',
          opacity: textAnim, // Menggunakan animasi opacity
        }}
      >
        Hidup Sehat Mengonsumsi makanan bergizi yang mencakup sayuran, buah-buahan yang segar
      </Animated.Text>

      {/* Input untuk pencarian */}
      <TextInput
        style={{
          borderColor: '#ccc',
          backgroundColor: 'white',
          color: '#333',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 8,
          fontSize: 16,
          marginBottom: 20,
        }}
        placeholder="Cari salad"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{
            flex: 1,
            borderColor: '#ccc',
            backgroundColor: 'white',
            color: '#333',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 8,
            fontSize: 16,
          }}
          placeholder="Tulis salad kesukaanmu di sini"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            marginLeft: 10,
            backgroundColor: '#28a745',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            justifyContent: 'center',
          }}
          onPress={handleAdd}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Beli</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredSalads}  // Menampilkan daftar yang sudah difilter
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}>
            {item.id === editId ? (
              <TextInput
                style={{
                  flex: 1,
                  borderColor: '#ccc',
                  color: '#333',
                  backgroundColor: 'white',
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  fontSize: 16,
                }}
                value={editTitle}
                onChangeText={setEditTitle}
              />
            ) : (
              <Text style={{ color: '#333', fontSize: 18, flex: 1 }}>{item.title}</Text>
            )}

            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {item.id === editId ? (
                <Pressable
                  style={{
                    backgroundColor: '#007bff',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={handleEdit}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    backgroundColor: '#ffc107',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={() => handleStartEdit(item.id, item.title)}>
                  <Text style={{ color: 'white', fontSize: 16 }}>ya</Text>
                </Pressable>
              )}
              <Pressable
                style={{
                  backgroundColor: '#dc3545',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
                onPress={() => handleDelete(item.id)}>
                <Text style={{ color: 'white', fontSize: 16 }}>tidak</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Search;
