import { StyleSheet } from "react-native";
import { colors } from "@/src/styles/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    alertBox: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    success: {
        backgroundColor: colors.green[300],
    },
    error: {
        backgroundColor: colors.red[300],
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "white",
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    successButton: {
        backgroundColor: colors.green[500],
    },
    errorButton: {
        backgroundColor: colors.red[500],
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
