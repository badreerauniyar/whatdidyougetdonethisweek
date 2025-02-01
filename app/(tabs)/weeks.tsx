import { StyleSheet, Image, Platform, Text, SafeAreaView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';

export default function Weeks() {
  return (
    <SafeAreaView>
      <ThemedText>Week</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
