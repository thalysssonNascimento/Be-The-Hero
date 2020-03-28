import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

import logo from '../../assets/logo.png';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetails(incident){
        navigation.navigate('Details', {incident});
    }

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('/incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    };

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                total cases: <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>Choose one of the cases below and save the day</Text>

            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>NGO: </Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASE: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALUE: </Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigationToDetails(incident)}
                        >
                            <Text style={styles.detailsButtonText}>See more details</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
