import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";

const ListRender = ({
  selected,
  onItemPress,
  buttonWidth,
  item,
  listItemProps = {},
  listItemStyle = {},
  listLabelStyle = {},
  isMultiple,
  showTick = true,
  RenderTick = null,
}) => {
  const _Tick = () => (
    <>
      {RenderTick !== null ? (
        <RenderTick />
      ) : (
        <Image
          style={styles.tickStyle}
          source={require("../../assets/images/dropdown/tick.png")}
        />
      )}
    </>
  );

  const _renderTick = () => {
    return isMultiple
      ? selected.includes(item) && _Tick()
      : item?.value === selected?.value && _Tick();
  };

  return (
    <TouchableOpacity
      {...listItemProps}
      style={[
        styles.pickerCard,
        {
          width: buttonWidth,
        },
        listItemStyle,
      ]}
      onPress={() => {
        onItemPress(item);
      }}
    >
      <View style={[styles.labelStyle]}>
        <Text numberOfLines={1} style={[listLabelStyle]}>
          {item?.label}
        </Text>
        {showTick && _renderTick()}
      </View>
    </TouchableOpacity>
  );
};

export default ListRender;

const styles = StyleSheet.create({
  tickStyle: {
    width: 18,
    height: 18,
  },
  pickerCard: { marginBottom: 5 },
  labelStyle: {
    height: 24,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    alignItems: "center",
    borderBottomColor: colors.GREY_03,
  },
});
