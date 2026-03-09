/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View, TextInput } from 'react-native';

const mockFn = jest.fn();

const handleProps = { animatedIndex: { value: 0 }, animatedPosition: { value: 0 } };

const ForwardRefView = React.forwardRef<any, any>((props: any, ref: any) => {
  const { children, handleComponent: HandleComponent, ...rest } = props;
  return React.createElement(
    View,
    { ...rest, ref },
    HandleComponent ? React.createElement(HandleComponent, handleProps) : null,
    children
  );
});

const ForwardRefTextInput = React.forwardRef<any, any>((props: any, ref: any) =>
  React.createElement(TextInput, { ...props, ref }, props.children)
);

const BottomSheet = ForwardRefView;
const BottomSheetModal = ForwardRefView;
const BottomSheetBackdrop = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetHandle = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetView = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetScrollView = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetFlatList = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetSectionList = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetVirtualizedList = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetTextInput = ForwardRefTextInput;
const BottomSheetFooter = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetFooterContainer = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetModalProvider = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);
const BottomSheetDraggableView = (props: { children?: React.ReactNode }) =>
  React.createElement(View, null, props.children);

const useBottomSheet = () => ({
  expand: mockFn,
  collapse: mockFn,
  close: mockFn,
  snapToIndex: mockFn,
  snapToPosition: mockFn,
  forceClose: mockFn,
});

const useBottomSheetModal = () => ({
  ...useBottomSheet(),
  dismiss: mockFn,
});

const useBottomSheetSpringConfigs = () => ({});
const useBottomSheetTimingConfigs = () => ({});
const useBottomSheetInternal = () => ({});
const useBottomSheetModalInternal = () => ({});
const useScrollEventsHandlersDefault = () => ({});
const useGestureEventsHandlersDefault = () => ({});
const useBottomSheetGestureHandlers = () => ({});
const useScrollHandler = () => ({});
const useScrollableSetter = () => {};
const useBottomSheetScrollableCreator = () => ({});
const createBottomSheetScrollableComponent = () => View;
const TouchableHighlight = View;
const TouchableOpacity = View;
const TouchableWithoutFeedback = View;
const enableLogging = mockFn;

export default BottomSheet;
export {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetSectionList,
  BottomSheetVirtualizedList,
  BottomSheetTextInput,
  BottomSheetFooter,
  BottomSheetFooterContainer,
  BottomSheetModalProvider,
  BottomSheetDraggableView,
  useBottomSheet,
  useBottomSheetModal,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
  useBottomSheetInternal,
  useBottomSheetModalInternal,
  useScrollEventsHandlersDefault,
  useGestureEventsHandlersDefault,
  useBottomSheetGestureHandlers,
  useScrollHandler,
  useScrollableSetter,
  useBottomSheetScrollableCreator,
  createBottomSheetScrollableComponent,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  enableLogging,
};
