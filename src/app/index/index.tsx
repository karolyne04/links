import { Alert, FlatList, Image,  Modal,  Text, Linking, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "@/src/styles/color";
import { Category } from "@/src/components/category";
import { categories } from "@/src/utils/categories";
import { Categories } from "@/src/components/categories";
import { Link } from "@/src/components/link";
import { MaterialIcons } from "@expo/vector-icons";
import { Option } from "@/src/components/option";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { type LinkStorage, linkStorage } from "@/src/storage/link-storage";
import AlertErro from "@/src/components/alert-erro";

export default function Index() {
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
    const [showModal, setShowModal] = useState(false)
    const [links, setLinks] = useState<LinkStorage[]>([])
    const [category, setCategory] = useState(categories[0].name)
   
    const [alert, setAlert] = useState({ visible: false, message: "", type: "" })

    async function getLinks() {
        try {
            const response = await linkStorage.get()
            const filtered = response.filter((link) => link.category === category)
            console.log("Recarregar lista")
            setLinks(filtered)
        } catch (error) {
            setAlert({visible: true, type: "error", message: "Não foi possivel listar os links" });
            console.log(error);
            
        }
    }

    async function handleOpen() {
        try {
            await Linking.openURL(link.url)
        } catch (error) {
            setAlert({visible: true, type:"error", message:"Não foi possível abrir o link"});
            console.log(error);
        }
    }

    function handleDetails(selected: LinkStorage) {
        setShowModal(true)
        setLink(selected)
    }

    async function linkRemove() {
        try {
            await linkStorage.remove(link.id)
            getLinks()
            setShowModal(false)
            setAlert({visible:true, type:"success", message:"Link excluo com sucesso"});
        } catch (error) {
            setAlert({visible: true, type:"error", message:"Não foi possível excluir"});
            console.log(error);
        }
    }

    async function handleRemove() {
        Alert.alert("Excluir", "Deseja realmente excluir?", [
            {style: "cancel", text: "Não"},
            {text: "Sim", onPress: linkRemove}
        ])
    }
    
    const handleClose = () => {
		setAlert({ visible: false, message: "", type: "" });
	};

    useFocusEffect(
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useCallback(() => {
        getLinks()
    }, [category])
)

    return (
        <View style={styles.container}>

           <View style={styles.header}> 
                <Image source={require("../../assets/logo.png")} style={styles.logo}/>
               <TouchableOpacity onPress={() => router.navigate("./add")}>
                    <AntDesign name="plus" size={24} color={colors.green[300]} />
               </TouchableOpacity>
           </View>
           <Categories onChange={setCategory} selected={category} />
           <FlatList 
                data={links}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Link 
                         name={item.name}
                         url={item.url} 
                         onDetails={() => handleDetails(item)}
                     />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
           />
           <Modal transparent visible={showModal}>
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalCategory}>
                            {link.category}
                        </Text>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <MaterialIcons 
                                name="close" 
                                size={20} 
                                color={colors.gray[400]}
                            />

                        </TouchableOpacity>

                    </View>
                    <Text style={styles.modalLinkName}>
                        {link.name}
                    </Text>

                    <Text style={styles.modalUrl}>
                        {link.url}
                    </Text>

                    <View style={styles.modalFooter}>
                        <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove}/>
                        <Option name="Abrir" icon="language" onPress={handleOpen}/>
                    </View>
                </View>
            </View>
           </Modal>
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

