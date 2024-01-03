import * as React from 'react'
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import DatePickerModalContent, {
  DatePickerModalContentMultiProps,
  DatePickerModalContentRangeProps,
  DatePickerModalContentSingleProps,
} from './DatePickerModalContent'

interface DatePickerModalProps {
  visible: boolean
  animationType?: 'slide' | 'fade' | 'none'
  disableStatusBar?: boolean
  disableStatusBarPadding?: boolean
  inputEnabled?: boolean
  presentationStyle?: 'pageSheet' | 'overFullScreen'
}

export interface DatePickerModalSingleProps
  extends DatePickerModalContentSingleProps,
  DatePickerModalProps { }

export interface DatePickerModalMultiProps
  extends DatePickerModalContentMultiProps,
  DatePickerModalProps { }

export interface DatePickerModalRangeProps
  extends DatePickerModalContentRangeProps,
  DatePickerModalProps { }

export function DatePickerModal(
  props:
    | DatePickerModalRangeProps
    | DatePickerModalSingleProps
    | DatePickerModalMultiProps
) {
  const theme = useTheme()
  const {
    visible,
    animationType,
    disableStatusBar,
    disableStatusBarPadding,
    inputEnabled,
    presentationStyle,
    ...rest
  } = props
  const animationTypeCalculated =
    animationType ||
    Platform.select({
      web: 'none',
      default: 'slide',
    })


  return (
    <View style={[StyleSheet.absoluteFill]} pointerEvents="box-none">
      <Modal
        animationType={animationTypeCalculated}
        transparent={true}
        visible={visible}
        onRequestClose={rest.onDismiss}
        // presentationStyle={isPageSheet ? 'pageSheet' : 'overFullScreen'}
        // supportedOrientations={supportedOrientations}
        statusBarTranslucent={true}
      // style={{margin: 0,   justifyContent: 'center',
      // alignItems: 'center',}}
      >
        <TouchableWithoutFeedback onPress={rest.onDismiss}>
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.modalBackground,
              { backgroundColor: theme.colors.backdrop, borderRadius: 28 },
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[StyleSheet.absoluteFill, styles.modalRoot]}
          pointerEvents="box-none"
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
              // dimensions.width > 650 ? styles.modalContentBig : null,
            ]}
          >
            <DatePickerModalContent
              {...rest}
              inputEnabled={inputEnabled} 
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 560,
    marginTop: '50%',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 28,
  },
  modalBackground: {
    // flex: 1,

  },
  modalContent: {
    flex: 1,
    width: '100%',
    borderRadius: 28
  },
  modalContentBig: {
    maxWidth: 600,
    maxHeight: 800,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
  },
})

export default React.memo(DatePickerModal)
