import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, IconButton, Text, useTheme, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Image } from "react-native-ui-lib";

import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    user: {
        fontWeight: 'medium',
        fontSize: 18,
    },

    items: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemstitle: {
        fontWeight: 'medium',
        fontSize: 16,
        width: '70%',
    },

    itemprice: {
        color: '#FDB2AD',
        fontSize: 18,
        fontWeight: 'medium',
        width: '25%',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});

const Profile = ({ navigation, theme }) => {

    const PROFILE_PIC = "https://static.wikia.nocookie.net/disney/images/3/3c/Profile_-_Sulley.jpg/revision/latest?cb=20200817112818";

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            {/* <Card onPress={() => { }} style={{ backgroundColor: theme.colors.inverseOnSurface }} >
                <Card.Title
                    title="Hello,"
                    subtitle="Sally Wong"
                    right={(props) => <IconButton {...props} icon="account-circle" size={40} />}
                    titleStyle={styles.title}
                    titleVariant="titleLarge"
                    subtitleStyle={styles.user}
                />
            </Card> */}

            <Text variant='headlineMedium' style={{ fontWeight: 'bold' }}> Expenses </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => { }}>
                <View style={{}}>
                    <Image
                        alt="Profile Picture"
                        source={{ uri: PROFILE_PIC }}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 9999,
                        }}
                    />
                </View>
                <Text variant='bodySmall' style={{}}> Sally Wong </Text>
            </TouchableOpacity>
        </View>
    )
};

const Budget = ({ theme }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text variant='titleMedium' style={{ color: theme.colors.onSurfaceVariant }}>Budget for the week</Text>
                <Text variant='headlineMedium' style={{ fontWeight: 'bold', color: theme.colors.secondary }}>$97.00</Text>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text variant='titleSmall' style={{ color: theme.colors.error }}>Spent</Text>
                <Text variant='headlineSmall' style={{ fontWeight: 'bold', color: theme.colors.error }}>$50.70</Text>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text variant='titleSmall' style={{ color: theme.colors.primary }}>Remaining</Text>
                <Text variant='headlineSmall' style={{ fontWeight: 'bold', color: theme.colors.primary }}>$46.30</Text>
            </View>

        </View>
    )
}

const ExpenditureChart = ({ theme }) => {

    const screenWidth = Dimensions.get('window').width;

    const LabelComponent = ({ label }) => (
        <View style={{ alignSelf: 'center' }}>
            <Text variant='labelSmall' style={{ fontWeight: 'bold', color: theme.colors.secondary }}>{label}</Text>
        </View>
    )

    const barData = [
        {
            value: 10.20,
            labelComponent: () => <LabelComponent label={'Mon'} />,
            topLabelComponent: () => <LabelComponent label={'10.2'} />
        },
        {
            value: 7.50,
            labelComponent: () => <LabelComponent label={'Tue'} />,
            topLabelComponent: () => <LabelComponent label={'7.5'} />
        },
        {
            value: 12.30,
            labelComponent: () => <LabelComponent label={'Wed'} />,
            topLabelComponent: () => <LabelComponent label={'12.3'} />
        },
        {
            value: 8.60,
            labelComponent: () => <LabelComponent label={'Thur'} />,
            topLabelComponent: () => <LabelComponent label={'8.6'} />
        },
        {
            value: 12.10,
            labelComponent: () => <LabelComponent label={'Fri'} />,
            topLabelComponent: () => <LabelComponent label={'12.1'} />,
            frontColor: theme.colors.primary
        },
        {
            value: 0,
            labelComponent: () => <LabelComponent label={'Sat'} />,
        },
        {
            value: 0,
            labelComponent: () => <LabelComponent label={'Sun'} />,
        },
    ];

    return (
        <View>
            <BarChart
                data={barData}
                frontColor={theme.colors.error}
                animationDuration={250}
                barBorderRadius={8}
                width={350}
                dashGap={30}
                dashWidth={5}
                barWidth={25}
                initialSpacing={30}
                noOfSections={4}
                hideRules={true}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelPrefix={'$'}
                yAxisTextStyle={{ fontWeight: 'bold', color: theme.colors.primary }}
                isAnimated={true}
            />
        </View>
    );
};

const Recent_expense = ( {theme} ) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const url = "https://fakestoreapi.com/products";

    useEffect(() => {
        fetch(url)
            .then((response) => response.json()) /*sucessful response in json format*/

            .then((json) => setData(json)) /*Convert response to json format in data*/
            .catch((error) => console.error(error)) /*fails to fetch*/
            .finally(() => setLoading(false)); /*Regardless whether it fails or not*/

    }, [])

    const renderItem = ({ item }) => (
        <View key={item.id} style={{ marginTop: '2%' }}>
            <View style={styles.items}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemstitle}>
                    {item.title}
                </Text>
                <Text style={styles.itemprice}>-${item.price}</Text>
            </View>
            <View>
                <Text style={{ color: 'grey' }}>04 Nov 2022</Text>
            </View>
        </View>
    );

    return (
        <View style={{ marginTop: 20, flexDirection: 'column', alignSelf: 'flex-start'}}>

            <View style={{ flexDirection: 'row' }}>
                <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>Recent Expenses</Text>
            </View>

            {/*
            <Card style={{ backgroundColor: theme.colors.elevation.level3 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.title, { marginBottom: 'auto', marginTop: 'auto' }]}>Expenses </Text>
                        <TouchableOpacity>
                            <IconButton icon="filter-outline" iconColor='white' onPress={() => { }} />
                        </TouchableOpacity>
                    </View>
                    {
                        loading ? <Text> Loading...</Text> : (
                            <FlatList
                                data={data}
                                renderItem={renderItem} // will be called each item in the array
                                keyExtractor={(item) => item.id.toString()}
                                style={{ height: 200 }}
                                showsVerticalScrollIndicator={false}
                            />
                        )
                        // data.map((post) => (
                        //   <View key={post.id} style={{ marginTop: '2%' }}>
                        //     <View style={styles.items}>
                        //       <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemstitle}>
                        //         {post.title}
                        //       </Text>
                        //       <Text style={styles.itemprice}>-${post.price}</Text>
                        //     </View>
                        //     <View>
                        //       <Text style={{ color: 'grey' }}>04 Nov 2022</Text>
                        //     </View>
                        //   </View>
                        // ))
                    }
                </View>
            </Card>
            */}
        </View>
    );
}

const TrialScreen = () => {

    const navigation = useNavigation()
    const theme = useTheme()

    return (
        <View style={{ flex: 1, flexDirection: 'column', gap: 10, alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>

            <Profile navigation={navigation} theme={theme} />
            <Divider />
            <Budget theme={theme} />
            <ExpenditureChart theme={theme} />
            <Recent_expense theme={theme} />

        </View>
    )
};

export default TrialScreen;