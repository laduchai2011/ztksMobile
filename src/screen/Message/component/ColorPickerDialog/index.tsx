import React, { memo, useState } from 'react';
import { View, Pressable } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import ColorPicker, { Panel1, HueSlider, Preview } from 'reanimated-color-picker';
import { setIsShow_colorPickerDialog } from '@src/redux/slice/Message';

const ColorPickerDialog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isShow: boolean = useSelector((state: RootState) => state.MessageSlice.colorPickerDialog.isShow);
    const [color, setColor] = useState('#ff0000');

    const handleComplete = (pickedColor: any) => {
        setColor(pickedColor.hex);
    };

    const handleOverlayClick = () => {
        dispatch(setIsShow_colorPickerDialog(false));
    };

    if (!isShow) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Overlay */}
            <Pressable style={styles.overlay} onPress={handleOverlayClick} />

            {/* Dialog */}
            <View style={styles.parent}>
                <ColorPicker style={{ width: '100%' }} value={color} onCompleteJS={handleComplete}>
                    <Preview />

                    <Panel1
                        style={{
                            height: 200,
                            borderRadius: 20,
                        }}
                    />

                    <HueSlider
                        style={{
                            marginTop: 20,
                            borderRadius: 20,
                        }}
                    />
                </ColorPicker>
            </View>
        </View>
    );
};

export default memo(ColorPickerDialog);
