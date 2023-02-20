import * as React from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {
  const [ pin, setPin ] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324
  })
  const [ region, setRegion ] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  
  return (
    <View style={{marginTop : 50, flex : 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longtitue: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: 'AIzaSyAZYKnpA40TfTUxuDiIJr2FmX4hMR79GTY',
          language: 'en',
          components: "country:us", 
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1},
          listView: { backgroundColor: "white" }
        }}
      />
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider="google"
      
      >
        <Marker 
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }} 
        />
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start:", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            console.log("Drag end:", e.nativeEvent.coordinate)
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longtitue
            })
            console.log("Now I'm at: ", pin)
          }}
          
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>

        </Marker>

        <Circle 
          center={pin} 
          radius={1000} 
        />
      </MapView>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
