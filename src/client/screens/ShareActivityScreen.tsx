import React from 'react';
import { View, Text, Button, Share } from 'react-native';

type Activity = { name?: string } | undefined;

type Props = {
  route: { params?: { activity?: Activity } };
  navigation: any;
};

export default function ShareActivityScreen({ route, navigation }: Props) {
  const activity = route.params?.activity;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my recent activity: ${activity?.name || 'an awesome adventure!'} 🚀`,
      });
    } catch (err) {
      console.error('Error sharing activity:', err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Share Activity</Text>
      {activity && (
        <Text style={{ marginTop: 10 }}>You're sharing: {activity.name}</Text>
      )}
      <Button title="Share Now" onPress={handleShare} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
