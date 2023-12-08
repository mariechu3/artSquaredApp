import { TouchableOpacity } from "react-native";
import Text from "../components/Text"

export default Button = ({ children, onPress, textSize, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{ paddingVertical: 2, paddingHorizontal: 10, alignItems: 'center', borderRadius: 10, borderColor: 'black', backgroundColor: '#D9D9D9', borderWidth: 2, width: "auto" }, props.style]}>
            <Text style={{ fontSize: textSize, width: "auto" }}>{children}</Text>
        </TouchableOpacity>
    )
}