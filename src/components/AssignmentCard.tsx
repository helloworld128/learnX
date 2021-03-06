import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import dayjs from '../helpers/dayjs';
import {removeTags} from '../helpers/html';
import {getLocale, getTranslation} from '../helpers/i18n';
import InteractablePreviewWrapper, {
  IInteractablePreviewWrapperProps,
} from './InteractablePreviewWrapper';
import {useColorScheme} from 'react-native-appearance';

export interface IAssignmentCardProps extends IInteractablePreviewWrapperProps {
  title: string;
  hasAttachment: boolean;
  submitted: boolean;
  graded: boolean;
  date: string;
  description?: string;
  courseName?: string;
  courseTeacherName?: string;
}

const styles = StyleSheet.create({
  root: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
  },
});

const AssignmentCard: React.FC<IAssignmentCardProps> = props => {
  const {
    onPress,
    title,
    hasAttachment,
    date,
    courseName,
    courseTeacherName,
    description,
    pinned,
    onPinned,
    submitted,
    graded,
    dragEnabled,
    fav,
    onFav,
    unread,
    onRead,
    onRemind,
  } = props;

  const colorScheme = useColorScheme();

  return (
    <InteractablePreviewWrapper
      pinned={pinned}
      onPinned={onPinned}
      onPress={onPress}
      fav={fav}
      onFav={onFav}
      unread={unread}
      onRead={onRead}
      onRemind={onRemind}
      dragEnabled={dragEnabled}>
      <View
        style={[
          styles.root,
          {
            backgroundColor: Colors.system('background', colorScheme),
            borderLeftColor: Colors.system('purple', colorScheme),
            borderLeftWidth: pinned ? 10 : 0,
          },
        ]}>
        <View style={styles.flexRow}>
          <Text
            style={[
              styles.title,
              colorScheme === 'dark'
                ? iOSUIKit.bodyEmphasizedWhite
                : iOSUIKit.bodyEmphasized,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          {hasAttachment && (
            <Icon
              style={styles.icon}
              name="attachment"
              size={18}
              color={Colors.system('yellow', colorScheme)}
            />
          )}
          {submitted && (
            <Icon
              style={styles.icon}
              name="done"
              size={18}
              color={Colors.system('green', colorScheme)}
            />
          )}
          {graded && (
            <Icon
              style={styles.icon}
              name="grade"
              size={18}
              color={Colors.system('red', colorScheme)}
            />
          )}
          {unread && (
            <MaterialCommunityIcon
              style={styles.icon}
              name="checkbox-blank-circle"
              size={10}
              color={Colors.system('blue', colorScheme)}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 8,
          }}>
          <Text
            style={
              colorScheme === 'dark' ? iOSUIKit.subheadWhite : iOSUIKit.subhead
            }
            numberOfLines={3}>
            {removeTags(description || '') ||
              getTranslation('noAssignmentDescription')}
          </Text>
        </View>
        <View
          style={[
            styles.flexRow,
            {
              marginTop: 10,
            },
          ]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: Colors.system('gray', colorScheme),
              fontSize: 13,
            }}>
            {courseName &&
              courseTeacherName &&
              `${courseTeacherName} / ${courseName}`}
          </Text>
          <Text
            style={{
              color: Colors.system('gray', colorScheme),
              fontSize: 13,
            }}>
            {getLocale().startsWith('zh')
              ? dayjs().isAfter(dayjs(date))
                ? dayjs().to(dayjs(date)) + '截止'
                : '还剩 ' + dayjs().to(dayjs(date), true)
              : dayjs().isAfter(dayjs(date))
              ? 'closed ' + dayjs().to(dayjs(date))
              : 'due in ' + dayjs().to(dayjs(date), true)}
          </Text>
        </View>
      </View>
    </InteractablePreviewWrapper>
  );
};

export default AssignmentCard;
