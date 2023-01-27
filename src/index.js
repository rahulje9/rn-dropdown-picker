import React, { useCallback, useMemo, useState, FC } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import EmptyList from "./components/EmptyList";
import Label from "./components/Label";
import ListRender from "./components/ListRender";
import colors from "./utils/colors";
import constants from "./utils/constants";

const DropDown = ({
  data = [],
  dropdownHeight = 140,
  isMultiple = false,
  RenderTick = null,
  listItemProps = {},
  listItemStyle = {},
  listLabelStyle = {},
  showTick = true,
  onChange = () => {},
  containerStyle = {},
  showArrows = true,
  RenderUpArrow = null,
  RenderDownArrow = null,
  placeholder = "",
  placeholderStyle = {},
  RenderPlaceholder = null,
  RenderSelectedItem = null,
  selectedItemLabelStyle = {},
  flatListStyle = {},
  flatListProps = {},
  RenderEmptyList = null,
  onSelect = () => {},
}) => {
  const [showPicker, setshowPicker] = useState(false);
  const [yAxis, setyAxis] = useState(0);
  const [buttonWidth, setbuttonWidth] = useState(0);
  const [xAxis, setxAxis] = useState(0);
  const [dropdownButton, setdropdownButton] = useState(0);
  const [listHeight, setlistHeight] = useState(0);
  // multiple
  const [selected, setSelected] = useState([]);
  // single
  const [value, setValue] = useState("");

  const onItemPress = (item) => {
    if (isMultiple) {
      onMultiItemPress(item);
    } else {
      onSingleItemPress(item);
    }
  };

  const onSingleItemPress = (item) => {
    if (JSON.stringify(value) === JSON.stringify(item)) {
      setValue("");
    } else {
      setValue(item);
    }
    onSelect(item);
    onChange(item);
  };

  const onMultiItemPress = (item) => {
    const _selected = selected?.length ? [...selected] : [];
    if (_selected.includes(item)) {
      const itemIndex = _selected.indexOf(item);
      if (itemIndex > -1) {
        // only splice array when item is found
        _selected.splice(itemIndex, 1); // 2nd parameter means remove one item only
      }
    } else {
      _selected.push(item);
    }
    onChange([...new Set(_selected)]);
    setSelected([...new Set(_selected)]);
    onSelect([...new Set(_selected)]);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <ListRender
        buttonWidth={buttonWidth}
        item={item}
        index={index}
        onItemPress={() => {
          onItemPress(item);
        }}
        key={item?.value}
        selected={isMultiple ? selected : value}
        isMultiple={isMultiple}
        RenderTick={RenderTick}
        {...{ listItemProps, listItemStyle, listLabelStyle, showTick }}
      />
    );
  };

  const closeModal = () => {
    setshowPicker(false);
  };

  const isOutsideView = useMemo(() => {
    const deviceHeight = Dimensions.get("screen")?.height;
    const positionWithHeight = yAxis + listHeight;
    return {
      top:
        positionWithHeight <= deviceHeight
          ? yAxis
          : yAxis - (listHeight + dropdownButton),
    };
  }, [yAxis, listHeight, dropdownButton]);

  const _placeholder = useCallback(() => {
    let __placeholder = "";
    if (RenderPlaceholder === null) {
      __placeholder = (
        <Label style={placeholderStyle}>
          {placeholder ? placeholder : constants.SELECT}
        </Label>
      );
    } else {
      __placeholder = (
        <>
          <RenderPlaceholder />
        </>
      );
    }
    return __placeholder;
  }, [RenderPlaceholder, placeholder, placeholderStyle]);

  const _renderSelected = useCallback(() => {
    let __renderSelected =
      RenderSelectedItem !== null ? (
        <>
          <RenderSelectedItem />
        </>
      ) : isMultiple ? (
        <Label
          style={[selectedItemLabelStyle]}
        >{`${selected?.length} ${constants.SELECTED}`}</Label>
      ) : (
        <Label style={[selectedItemLabelStyle]}> {value?.label}</Label>
      );
    return __renderSelected;
  }, [
    RenderSelectedItem,
    isMultiple,
    selected?.length,
    selectedItemLabelStyle,
    value?.label,
  ]);

  const _renderLabel = useCallback(() => {
    let __renderLabel = "";
    if (selected?.length || value !== "") {
      __renderLabel = <>{_renderSelected()}</>;
    } else {
      __renderLabel = <>{_placeholder()}</>;
    }

    return __renderLabel;
  }, [_placeholder, _renderSelected, selected?.length, value]);

  const ArrowPicker = ({ isUp }) => {
    const path = isUp
      ? require("../assets/images/dropdown/arrow-up.png")
      : require("../assets/images/dropdown/arrow-down.png");
    return <Image style={styles.arrowStyle} source={path} />;
  };

  const RenderArrows = () => {
    return showArrows ? (
      showPicker ? (
        RenderUpArrow !== null ? (
          <>
            <RenderUpArrow />
          </>
        ) : (
          <ArrowPicker isUp />
        )
      ) : RenderDownArrow !== null ? (
        <>
          <RenderDownArrow />
        </>
      ) : (
        <ArrowPicker />
      )
    ) : null;
  };

  const _emptyList = () => {
    let __emptyList = "";
    if (RenderEmptyList === null) {
      __emptyList = (
        <EmptyList
          emptyListContainerStyle={{}}
          emptyListLabelStyle={{}}
          height={dropdownHeight}
        />
      );
    } else {
      __emptyList = (
        <>
          <RenderEmptyList />
        </>
      );
    }
    return <>{__emptyList}</>;
  };

  return (
    <>
      <View
        onLayout={(event) => {
          event.target.measureInWindow((x, y, width, height) => {
            setyAxis(y + height);
            setbuttonWidth(width);
            setxAxis(x);
            setdropdownButton(height);
          });
        }}
        style={[styles.container, containerStyle]}
      >
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            setshowPicker(!showPicker);
          }}
        >
          {_renderLabel()}

          <RenderArrows />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <Modal transparent={true} visible={showPicker}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalChild}>
                <Pressable onPress={() => {}}>
                  <FlatList
                    onLayout={(event) => {
                      event.target.measureInWindow((height) => {
                        setlistHeight(height);
                      });
                    }}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[
                      styles.flatList,
                      {
                        height: dropdownHeight,
                        width: buttonWidth,
                        left: xAxis,
                        ...isOutsideView,
                      },
                      flatListStyle,
                    ]}
                    data={data}
                    renderItem={_renderItem}
                    ListEmptyComponent={_emptyList}
                    {...flatListProps}
                  />
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  placeholder: {
    color: colors.BLACK,
  },
  container: {
    height: 30,
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.LIGHT_BLACK_01,
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.TRANSPARENT,
  },
  modalChild: {
    backgroundColor: colors.TRANSPARENT,
    flex: 1,
  },
  dropdownButton: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  arrowStyle: {
    width: 18,
    height: 18,
  },
  flatList: {
    height: 140,
    borderWidth: 1,
    position: "absolute",
    backgroundColor: colors.WHITE,
    zIndex: 20,
    marginTop: 5,
    borderColor: colors.LIGHT_BLACK_01,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  marginTop10: {
    marginTop: 10,
  },
});
