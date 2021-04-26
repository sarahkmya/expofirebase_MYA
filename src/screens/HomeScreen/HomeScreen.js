import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, ScrollView, View } from 'react-native'
import styles from './styles';
import { FAB } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import FormBuilder from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { firebase } from '../../firebase/config'

function HomeScreen2({ navigation }) {

  const [entities, setEntities] = useState([])

  useEffect(() => {
    firebase.database().ref('meals/').on("value", querySnapshot => {

      const aNewEntities = []
      let oEntities = querySnapshot.val();
      try {
        Object.keys(oEntities).map((key) => {
          const oEntity = oEntities[key];
          console.log(oEntity);
          oEntity.id = key;
          aNewEntities.push(oEntity)
        });
        setEntities(aNewEntities)
      } catch (e) {
        console.log(e.toString())
      }
    },
      error => {
        console.log(error)
      }
    )
  }, [])

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Card>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.pricing}</Paragraph>
            <Paragraph>{item.pick_up}</Paragraph>
            <Paragraph>{item.full_description}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.featured_image }} />
          <Card.Actions>
            <Button>Edit</Button>
          </Card.Actions>
        </Card>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      { entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  )
}

function DetailsScreen({ navigation }) {

  const form = useForm({
    defaultValues: {
      email: '',

      password: '',
    },

    mode: 'onChange',
  });


  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}> Choose your crafting Kit!</Text>

        <FormBuilder
          form={form}
          formConfigArray={[
            {
              type: 'input',

              name: 'title',

              label: 'Title',

              rules: {
                required: {
                  value: true,

                  message: 'Title is required',
                },
              },

              textInputProps: {
                keyboardType: 'default',

                autoCapitalize: 'none',
              },
            },

            {
              type: 'input',

              name: 'meta_description',

              label: 'Meta Description',

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                multiline: true,
                numberOfLines: 4
              },
            },
            {
              type: 'input',

              name: 'pricing',

              label: 'Pricing',

              rules: {
                required: {
                  value: false,
                },
              },
              textInputProps: {
                multiline: true,
                numberOfLines: 4
              },
            },
            {
              type: 'input',

              name: 'pick_up',

              label: 'Pick-up',

              rules: {
                required: {
                  value: false,
                },
              },
              textInputProps: {
                multiline: true,
                numberOfLines: 4
              },
            },
            {
              type: 'input',

              name: 'full_description',

              label: 'Full Description',

              rules: {
                required: {
                  value: false,
                },
              },


              textInputProps: {
                multiline: true,
                numberOfLines: 4
              },
            },
            {
              type: 'input',

              name: 'featured_image',

              label: 'Featured Image',

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                keyboardType: 'default',

                autoCapitalize: 'none',
              },
            },

          ]}>
          <Button
            mode={'contained'}
            onPress={form.handleSubmit((data) => {
              console.log('form data', data);
              const timestamp = firebase.firestore.FieldValue.serverTimestamp();
              const entityID = new Date().toISOString().replace(".", "_");
              firebase.database().ref('meals/' + entityID).set(data)
                .then(_doc => {
                  Keyboard.dismiss();
                  navigation.popToTop();
                })
                .catch((error) => {
                  alert(error)
                });

            })}>
            Submit
            </Button>
        </FormBuilder>
      </ScrollView>
    </View>);
}

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen2} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
