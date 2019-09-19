import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import dayjs from '../helpers/dayjs';
import {getTranslation} from '../helpers/i18n';
import InteractablePreviewWrapper, {
  IInteractablePreviewWrapperProps,
} from './InteractablePreviewWrapper';
import Text from './Text';
import {useDarkMode} from 'react-native-dark-mode';

export interface IFileCardProps extends IInteractablePreviewWrapperProps {
  readonly title: string;
  readonly extension: string;
  readonly size: string;
  readonly date: string;
  readonly description?: string;
  readonly markedImportant: boolean;
  readonly courseName?: string;
  readonly courseTeacherName?: string;
}

const FileCard: React.FC<IFileCardProps> = props => {
  const {
    onPress,
    onPressIn,
    title,
    size,
    date,
    courseName,
    extension,
    courseTeacherName,
    markedImportant,
    pinned,
    onPinned,
    description,
    dragEnabled,
  } = props;

  const isDarkMode = useDarkMode();

  return (
    <InteractablePreviewWrapper
      pinned={pinned}
      onPinned={onPinned}
      onPress={onPress}
      onPressIn={onPressIn}
      dragEnabled={dragEnabled}>
      <View
        style={{
          backgroundColor: isDarkMode ? 'black' : 'white',
          padding: 15,
          paddingLeft: 20,
          paddingRight: 20,
          borderLeftColor: Colors.theme,
          borderLeftWidth: pinned ? 10 : 0,
        }}>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={[
              {flex: 1},
              isDarkMode
                ? iOSUIKit.bodyEmphasizedWhite
                : iOSUIKit.bodyEmphasized,
              Platform.OS === 'android' && {fontWeight: 'bold'},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={{fontSize: 13, marginLeft: 5}}>
            {(extension ? extension.toUpperCase() + ' ' : '') + size}
          </Text>
          {markedImportant && (
            <Icon
              style={{marginLeft: 5}}
              name="flag"
              size={18}
              color={isDarkMode ? Colors.redDark : Colors.redLight}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 8,
          }}>
          <Text
            style={isDarkMode ? iOSUIKit.subheadWhite : iOSUIKit.subhead}
            numberOfLines={3}>
            {description || getTranslation('noFileDescription')}
          </Text>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              justifyContent: 'space-between',
              marginTop: 10,
            },
          ]}>
          <Text
            style={{
              color: isDarkMode ? Colors.grayDark : Colors.grayLight,
              fontSize: 13,
            }}>
            {courseName &&
              courseTeacherName &&
              `${courseTeacherName} / ${courseName} `}
          </Text>
          <Text
            style={{
              color: isDarkMode ? Colors.grayDark : Colors.grayLight,
              fontSize: 13,
            }}>
            {dayjs(date).fromNow()}
          </Text>
        </View>
      </View>
    </InteractablePreviewWrapper>
  );
};

export default FileCard;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
