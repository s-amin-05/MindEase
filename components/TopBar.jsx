import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Import 'router' for navigation links
import { router } from "expo-router"; 

const { width, height } = Dimensions.get('window');

// Define menu items for easy mapping
const menuItems = [
  { name: 'Home', icon: 'home-outline', route: '/home' },
  { name: 'Mood Report', icon: 'stats-chart-outline', route: '/moodanalysis' },
  { name: 'Journal', icon: 'journal', route: '/Journal' },
  { name: 'Settings', icon: 'settings-outline', route: '/profile' },
  { name: 'About MindEase', icon: 'information-circle-outline', route: '/about' },
];

const TopBar = ({ 
    title = "MindEase", 
    onProfilePress // Keeping this prop for external handling
}) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  // Handles navigation and closes the menu
  const navigateAndClose = (route) => {
    router.replace(route);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 1. Main Top Bar Structure */}
      <View
        style={styles.topBarContainer}
      >
        {/* Left: Menu Icon - Toggles the menu state */}
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons 
            // Optional: change icon to 'close' when menu is open
            name={isMenuOpen ? "close" : "menu"} 
            size={32} 
            color="#111616" 
          />
        </TouchableOpacity>

        {/* Middle: Screen Title */}
        <Text style={styles.titleText}>
          {title}
        </Text>

        {/* Right: Profile Icon - Uses the passed prop or default alert */}
        <TouchableOpacity onPress={onProfilePress || (() => alert("Profile pressed!"))}>
          <Ionicons 
            name="person-circle-outline" 
            size={32} 
            color="#111616" 
          />
        </TouchableOpacity>
      </View>

      {/* 2. Side Menu Overlay */}
      {isMenuOpen && (
        <View style={styles.menuOverlay}>
          
          {/* Menu Drawer Content */}
          <View style={styles.menuDrawer}>
            
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>MindEase Menu</Text>
              {/* Close button inside the drawer */}
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="close" size={30} color="#111616" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.name}
                style={styles.menuItem}
                onPress={() => navigateAndClose(item.route)}
              >
                <Ionicons name={item.icon} size={24} color="#111616" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Overlay to close menu when clicking outside */}
          <TouchableOpacity 
            style={styles.menuBackdrop} 
            onPress={toggleMenu} 
            activeOpacity={1}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2, 
    // zIndex is important to ensure the TopBar is below the menu overlay
    zIndex: 10, 
  },
  titleText: {
    color: "#111616",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  
  // --- Menu Sheet Styles ---
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    flexDirection: 'row',
    zIndex: 999, // Ensure menu is on top of everything
  },
  menuDrawer: {
    width: width * 0.75, // 75% of screen width
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 5,
    elevation: 20,
  },
  menuBackdrop: {
    flex: 1, // Takes up the rest of the space (25% of the screen)
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111616',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#111616',
    fontWeight: '500',
  },
});

export default TopBar;