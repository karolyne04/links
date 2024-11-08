import { colors } from "@/src/styles/color";
import { Pressable, PressableProps, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = PressableProps & {
    name: string
    isSelected: boolean
    icon: keyof typeof MaterialIcons.glyphMap
}

export  function Category({name, icon, isSelected, onPress}: Props) {
    const color = isSelected ? colors.green[300] : colors.gray[400]
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <MaterialIcons name={icon} size={16} color={colors.gray[400]}/>
            <Text style={[styles.name, {color}]}>{name}</Text>
        </Pressable>
       
    )
}