import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface AlertErroProps {
    message: string;
    onClose: () => void;
    type: "success" | "error";
}

const AlertErro: React.FC<AlertErroProps> = ({ message, onClose, type }) => {
    const alertStyles = type === "success" ? styles.success : styles.error;

    return (
        <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.container}>
                <View style={[styles.alertBox, alertStyles]}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity 
                        onPress={onClose} 
                        style={[styles.button, type === "success" ? styles.successButton : styles.errorButton]}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AlertErro;
