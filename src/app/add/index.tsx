import { MaterialIcons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/src/styles/color";
import { router } from "expo-router";
import { Categories } from "@/src/components/categories";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { SetStateAction, useState } from "react";
import { linkStorage } from "@/src/storage/link-storage";
import AlertErro from "@/src/components/alert-erro";


export default function Add() {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [alert, setAlert] = useState({ visible: false, message: "", type: "" })

    const handleClose = () => {
		setAlert({ visible: false, message: "", type: "" });
	};


    async function handleAdd() {
        try {

            if (!category) {
                return Alert.alert("Categoria", "Selecione a categoria")
            }
    
            if (!name.trim()) {
                return Alert.alert("Nome", "Informe o nome")
            }
    
            if (!url.trim()) {
                return Alert.alert("Url", "informe a url")
            }

            await linkStorage.save({
                id: new Date().getTime().toString(),
                name,
                url, 
                category,
            })
            // Alert.alert("Sucesso", "Novo link adicionado", [
            //     {
            //         text: "ok", 
            //         onPress: () => router.back(),
            //         style: "cancel",
            //     },
            // ],
            // {cancelable: true}
            // )
            setAlert({visible: true, type:"success", message:"Novo link adicionado"})
        } catch (error) {
            setAlert({visible: true,  type:"error", message:"Não foi possível salvar o link"})
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories onChange={setCategory} selected={category} />

            <View style={styles.form}>
                <Input placeholder="Nome" onChangeText={setName} autoCorrect={false}/>
                <Input placeholder="url" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none"/>
                <Button title="Adicionar" onPress={handleAdd}/>

            </View>
            {alert.visible && (
                <AlertErro
                    message={alert.message}
                    onClose={handleClose}
                    type={alert.type}
                />
            )}
           
        </View>
    )
}