import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { jwtDecode } from 'jwt-decode';

interface CompletedHeaderIconProps {
  activityId: string;
  isCompleted?: boolean;
  iconSize?: number;
  onCompletedChange?: (completed: boolean) => void; 
}

const CompletedHeaderIcon: React.FC<CompletedHeaderIconProps> = ({
  activityId,
  isCompleted = false,
  iconSize = 24,
  onCompletedChange,
}) => {
  const [completed, setCompleted] = useState(isCompleted);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (loading || completed) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded: any = jwtDecode(token);
      const userId = decoded.id;

      await axios.post(
        'http://192.168.18.29:3000/api/saveCompleted',
        { userId, activityId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompleted(true);

      if (onCompletedChange) {
        onCompletedChange(true);
      }

      Alert.alert('Success', 'Activity marked as completed!');
    } catch (error: any) {
      console.error(error);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        Alert.alert('Already Completed', 'This activity has already been completed.');
      } else {
        Alert.alert('Error', 'Failed to mark activity as completed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleComplete}
      activeOpacity={0.7}
      style={{ marginRight: 16 }}
      disabled={loading || completed} 
    >
      <FontAwesome5
        name="check-circle"
        size={iconSize}
        color={completed ? 'green' : 'black'}
        style={{ opacity: loading ? 0.5 : 1 }}
      />
    </TouchableOpacity>
  );
};

export default CompletedHeaderIcon;
