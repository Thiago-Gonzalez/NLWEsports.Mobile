import { FlatList, Image } from "react-native";
import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);

    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl } : GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    useEffect(() => {
        fetch('http://192.168.15.20:3333/games')
        .then(response => response.json())
        .then(data => setGames(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image 
                    source={logoImg}
                    style={styles.logo}
                />

                <Heading 
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />

                <FlatList
                    data={games.sort((g1, g2) => g1._count.ads - g2._count.ads).reverse()}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard 
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}