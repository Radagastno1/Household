import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {  Household, Profile} from '../../types'
import { households, profiles } from '../../data';

interface HeaderProps {
    title: string;
    route:any;
  }
  const Header = () => {
    const [headerTitle, setHeaderTitle] = useState<string>('Home');
    // useEffect(() => {
    //     const profileId = route.params?.profileId;
    //     if (profileId) {
    //       const householdName = getHouseholdName(profiles, profileId,households);
    //       if (householdName) {
    //         setHeaderTitle(householdName);
    //       }
    //     }
    //   }, [route.params, profiles]);
    
      function getHouseholdName(profiles: Profile[], profileId: string, households: Household[]): string | null {
        const profile = profiles.find((p) => p.id === profileId);
        if (profile) {
          const household = households.find((h) => h.id === profile.householdId);
          return household?.name || null;
        }
        return null;
      }
    
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
    );
  };

  export default Header;
const styles = StyleSheet.create({
    header:{
        width:"100%",
        height:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20
    },

})