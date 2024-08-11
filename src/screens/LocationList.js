import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const LocationList = ({ places: initialPlaces, onPlacePress, searchFunc, onClose, getImageCanSee }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  
  //This image in case there is no image in that place
  const defaultImageUrl = 'https://i.postimg.cc/RZctxc7f/shelter-chile-unhcr-web.jpg';

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const updatedPlaces = await Promise.all(initialPlaces.map(async (place) => {
          const photoReference = place.photos?.[0]?.photo_reference;
          const imageUrl = photoReference ? await getImageCanSee(photoReference) : defaultImageUrl;
          return { ...place, imageUrl };
        }));
        setPlaces(updatedPlaces);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [initialPlaces]);

  const handleButtonPress = (buttonKey, searchQuery) => {
    setActiveButton(buttonKey);
    searchFunc(searchQuery);
  };

  const getButtonStyles = (buttonKey) => {
    const buttonColors = {
      nonprofits: "#0894fa",
      safety: "#ed4964",
      wifi: "#8a32a9",
      food: "#018850",
      public: "#ff730f",
    };

    const activeColor = buttonColors[buttonKey];
    const isActive = activeButton === buttonKey;

    return {
      backgroundColor: isActive ? activeColor : "#FFFFFF",
      color: isActive ? "#FFFFFF" : activeColor,
      iconColor: isActive ? "#FFFFFF" : activeColor,
    };
  };

  const renderItem = ({ item }) => {
    const isOpen = item.opening_hours ? item.opening_hours.open_now : null;
    const isOpenStatus = isOpen !== null ? (isOpen ? 'Open Now' : 'Closed') : 'Status Not Available';
    const statusColor = isOpen !== null ? (isOpen ? 'green' : 'red') : 'gray';
    
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={() => onPlacePress(item)}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.vicinity} numberOfLines={2}>{item.vicinity}</Text>
            <Text style={[styles.status, { color: statusColor }]}>
              {isOpenStatus}
            </Text>
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    
    <View style={styles.container}>
      
      {/* Header Container */}
      <View style={styles.headerContainer}>

        <View style={styles.headerContent}>
          <Image 
            source={{ uri: 'https://i.ibb.co/r6hnGsF/Image.png' }} 
            style={styles.headerImage} 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.modalTitle}>Explore SafeHaven</Text>
            <Text style={styles.subTitle}>Essential Housing Resources</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={20} color="#424243" />
        </TouchableOpacity>
        {/* Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getButtonStyles('nonprofits').backgroundColor }]}
            onPress={() => handleButtonPress('nonprofits', "nonprofit organization")}
          >
            <Ionicons name="business" size={18} color={getButtonStyles('nonprofits').iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: getButtonStyles('nonprofits').color }]}>Nonprofits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getButtonStyles('safety').backgroundColor }]}
            onPress={() => handleButtonPress('safety', "police hospital emergency")}
          >
            <Ionicons name="shield" size={18} color={getButtonStyles('safety').iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: getButtonStyles('safety').color }]}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getButtonStyles('wifi').backgroundColor }]}
            onPress={() => handleButtonPress('wifi', "free wifi place")}
          >
            <Ionicons name="wifi" size={18} color={getButtonStyles('wifi').iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: getButtonStyles('wifi').color }]}>Wifi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getButtonStyles('food').backgroundColor }]}
            onPress={() => handleButtonPress('food', "food bank free food salvation army")}
          >
            <Ionicons name="fast-food" size={18} color={getButtonStyles('food').iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: getButtonStyles('food').color }]}>Food Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: getButtonStyles('public').backgroundColor }]}
            onPress={() => handleButtonPress('public', "free shower library")}
          >
            <Ionicons name="library" size={18} color={getButtonStyles('public').iconColor} style={styles.icon} />
            <Text style={[styles.buttonText, { color: getButtonStyles('public').color }]}>Public Areas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Title and Button Container */}
      <View style={styles.titleAndButtonContainer}>
        <Text style={styles.resourcesTitle}>Resources</Text>
        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.showAllButtonText}>
            {showAll ? 'Less' : 'All'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* List Container */}
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={showAll ? places : places.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={(item) => item.place_id}
            style={styles.list}
          />
        )}
      </View>

      {/* Spotlights Section */}
      <View style={styles.spotlightsContainer}>
        <View style={styles.spotlightsHeader}>
          <Text style={styles.spotlightsTitle}>Spotlights</Text>
          <TouchableOpacity style={styles.allButton}>
            <Text style={styles.allButtonText}>All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.spotlightsScrollContainer}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/QX6Vbgb/Screenshot-20240808-125024-2.png' }}
            style={styles.spotlightImage}
          />
          <Image
            source={{ uri: 'https://i.ibb.co/djqxMBx/Screenshot-20240808-125124-2.png' }}
            style={styles.spotlightImage}
          />
          <Image
            source={{ uri: 'https://i.ibb.co/Z1f02xB/Screenshot-20240808-125201-2.png' }}
            style={styles.spotlightImage}
          />
          <Image
            source={{ uri: 'https://i.ibb.co/br8PGX2/Screenshot-20240808-125235-2.png' }}
            style={styles.spotlightImage}
          />
          <Image
            source={{ uri: 'https://i.ibb.co/nksvG13/Screenshot-20240808-125407-2.png' }}
            style={styles.spotlightImage}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
    fontFamily: 'AvenirNext-Regular',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'AvenirNext-Regular',
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    borderColor: '#8A2BE2',
    borderWidth: 2.5,
    padding: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
    fontFamily: 'AvenirNext-Regular',
  },
  vicinity: {
    fontSize: 14,
    color: "#888",
    fontFamily: 'AvenirNext-Regular',
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'AvenirNext-Regular',
  },
  heartButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    elevation: 2,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'AvenirNext-Regular',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
  showAllButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  showAllButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  titleAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourcesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'AvenirNext-Regular',
  },
  spotlightsContainer: {
    marginTop: 20,
  },
  spotlightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  spotlightsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'AvenirNext-Regular',
  },
  allButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  allButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  spotlightsScrollContainer: {
    flexDirection: 'row',
  },
  spotlightImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default LocationList;
