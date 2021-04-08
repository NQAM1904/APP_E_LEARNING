import AsyncStorage from '@react-native-async-storage/async-storage';

let lightModeColor = {
    backgroundColor: '#ffffff',
    backgroundColorHome: '#E5E5E5',
    secondaryBackground: '#F4F4F4',
    popupBackground: '#00000036',
    normal: '#1890FF',
    popupBackground: '#ffffff',
    border: '#E8E8E8',
    placeholder: '#8F8F8F',
    labelFocus: '#8C8C8C',
    error: '#F5222D',
    text: '#262626',
    green: '#4CD964',
    drawer: '#ffffff',
    header: '#1890FF',
    imageIcon: '#262626',
    border: '#E8E8E8',
    aboutHeader: '#1890FF',
    textdiff: '#000000',
    menuCategoryChoose: '#E8E8E8',
    keyboardAppearance: 'light',
    borderBottomWidth: '#E8E8E8',
    backgroundColorHomes: '#E5E5E5',
    tintColor: '#FFC53D',
    doneColor: '#1890FF',
    tintColor_: '#FFC53D',
    tintColor1: '#000',
    statusBar: 'dark-content',
    // ic_cross: image.ic_cross,
};

let darkModeColor = {
    aboutHeader: '#6A6A6A',
    backgroundColor: '#6A6A6A',
    backgroundColorHome: '#6A6A6A',
    secondaryBackground: '#2A2731',
    popupBackground: '#00000036',
    normal: '#1890FF',
    popupBackground: '#2A2731',
    border: '#595959',
    placeholder: '#8F8F8F',
    labelFocus: '#8C8C8C',
    error: '#F5222D',
    text: '#ffffff',
    green: '#4CD964',
    drawer: '#595959',
    header: '#6A6A6A',
    imageIcon: '#ffffff',
    textdiff: '#8C8C8C',
    menuCategoryChoose: '#595959',
    keyboardAppearance: 'dark',
    borderBottomWidth: '#8C8C8C',
    backgroundColorHomes: '#595959',
    doneColor: '#1890FF',
    tintColor: '#8C8C8C',
    tintColor_: '#FFC53D',
    tintColor1: '#fff',
    statusBar: 'light-content',
    // ic_cross: image.ic_crossWhite,
};

let color = lightModeColor;

let checkAppMode = async () => {
    let value = await AsyncStorage.getItem('appMode');
    // if (value != null)
    // {
    if (value === 'dark') {
        color = darkModeColor;
    } else {
        color = lightModeColor;
    }
    // }
    // else
    // {
    //   onChangeAppMode();
    // }
};

let removeAppMode = async () => {
    let value = await AsyncStorage.removeItem('appMode');
    if (value != null) {
        color = lightModeColor;
    } else {
        color = lightModeColor;
    }
};

let onChangeAppMode = async (appType) => {
    const value = await AsyncStorage.getItem('appMode');
    if (value === null) {
        await AsyncStorage.setItem('appMode', 'dark');
        color = darkModeColor;
    } else if (value === 'dark') {
        await AsyncStorage.setItem('appMode', 'light');
        color = lightModeColor;
    } else {
        await AsyncStorage.setItem('appMode', 'dark');
        color = darkModeColor;
    }
};

let getAppMode = async () => {
    const value = await AsyncStorage.getItem('appMode');
    return value;
};

export {
    color,
    lightModeColor,
    darkModeColor,
    getAppMode,
    onChangeAppMode,
    checkAppMode,
    removeAppMode,
};
