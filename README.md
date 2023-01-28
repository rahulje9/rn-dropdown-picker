#  rn-dropdown-picker 🔥

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)]()
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=for-the-badge&colorB=191A17)
[![Version](https://img.shields.io/npm/v/@rahulje9/rn-dropdown-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@rahulje9/rn-dropdown-picker)
[![npm](https://img.shields.io/npm/dt/@rahulje9/rn-dropdown-picker?style=for-the-badge)](https://www.npmjs.com/package/@rahulje9/rn-dropdown-picker)


A simple and customizable React Native Dropdown picker component. 


## Installation

 Supported version: react-native >= 0.59.0

  ```bash
  npm install @rahulje9/rn-dropdown-picker
  ```
  
  or
  
  ```bash
  yarn add @rahulje9/rn-dropdown-picker
  ```
### Single dropdown

![](https://github.com/rahulje9/rn-dropdown-picker/blob/main/gifs/single.gif)

### Multiple dropdown

![](https://github.com/rahulje9/rn-dropdown-picker/blob/main/gifs/multiple.gif)

## Example
```jsx
import DropDown from '@rahulje9/rn-dropdown-picker';

<DropDown
  dropdownHeight={120}
  data={[
    {
      label: 'one',
      value: 1,
    },
    {
      label: 'two',
      value: 2,
    },
    {
      label: 'three',
      value: 3,
    },
  ]}
/>

```

## Props

| Prop                        | Description                                                                           | Type                          | Default Value       | Required |
| :--------------------------:|:--------------------------------------------------------------------------------------|:-----------------------------:|:-------------------:|:--------:|
| data                       | Dropdown values                                                                        | Array                        | []                   | true     |
| dropdownHeight                | Dropdown list container height                       | Number                        | 140                   | false    |
| isMultiple       | multiple selection mode                                                     | Boolean                        | false       | false    |
| listItemProps           | default list item props                                                   | Object                        | {}                  | false    |
| listItemStyle         | default list item style                                               | Object                        | {}                 | false    |
| listLabelStyle                    | default list item label style                                                           | Object                        | {}                 | false    |
| showTick                       | show tick for selected items                                                              | Boolean                        | true                   | false    |
| RenderTick                      | Override default tick component                                                               | React Element                         | null                  | false    |
| onChange                    | callback to get user clicked item | Function                        |()=>null               | false    |
| containerStyle                    | container style for the dropdown button | Object                        | {}                 | false    |
| showArrows                    | whether to show or hide arrow on the dropdown button | Boolean                        | true                 | false    |
| RenderUpArrow                    | override default up arrow component |  React Element                       | null                 | false    |
| RenderDownArrow                    | override default down arrow component |  React Element                       | null                 | false    |
| placeholder                    | placeholder text | String                        | 'Select'                 | false    |
| placeholderStyle       | placeholder text style                                              | Object                        | {}                   | false    |
| RenderPlaceholder                    | to render custom placeholder component             | React Element                        | null                   | false    |
| RenderSelectedItem               |to render custom selection inside dropdown                                                              | React Element  | null             | false    |
| selectedItemLabelStyle         | selected item label styles                                                | Object                      | {}            | false    |
| flatListStyle           | flatlist style which is used to show the dropdown values                                                         | Object                        | {}         | false    |
| flatListProps  | flatlist props which is used to show the dropdown values                | Object                        | {}                  | false    |
| RenderEmptyList         | override default empty list component                                                        | React Element                        | null | false    |
| onSelect                   | callback to get the selected datas  | Function                          | ()=>null                | false    |
