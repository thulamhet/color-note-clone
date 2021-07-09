import React, { useState } from "react";
import { View,Switch, Text, SafeAreaView, StyleSheet, Modal, Alert, Pressable, Button, TextInput, TouchableOpacity, Dimensions  } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomCircle from "../components/CustomCircle";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextScreen : React.FC<{navigation: any}> = ({navigation}) => {
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const toggleSwitch = () => setReminderEnabled(previousState => !previousState);
    const [backgroundColor, setbackgroundColor] = useState('green');
    const [modalColorVisible, setModalColorVisible] = useState(false);
    const [modalReminderVisible, setModalReminderVisible] = useState(false);
    const submit = (color: string) => {
        setbackgroundColor(color);
        setModalColorVisible(false);
    }
    const [time, setTime] = useState('i');
    const [date, setDate] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleDateConfirm = (date:any) => {
      hideDatePicker();
      console.log(date.getDate())
      setDate(date.getDate());
    };
    const handleTimeConfirm = (time:any) => {
      hideTimePicker();
      setTime(time.getTime())
      console.log(time.getTime())
    };

    return (
        <SafeAreaView style={{backgroundColor: `${backgroundColor}`, flex: 1}}>
            <Modal
                visible={modalColorVisible}
                animationType='fade'
                transparent={true}
            >
                <View style={styles.modalColorView}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{margin: 4}}
                        >
    
                        </TouchableOpacity>
                        <CustomCircle colorCode='#c6d861' onPress={()=>submit('#c6d861')}/>
                        <CustomCircle colorCode='#686161' onPress={()=>submit('#686161')}/>
                        <CustomCircle colorCode='#46ca57' onPress={()=>submit('#46ca57')}/>
                        <CustomCircle colorCode='#b67398' onPress={()=>submit('#b67398')}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{margin: 4}}
                        >
    
                        </TouchableOpacity>
                        <CustomCircle colorCode='#61b6d8' onPress={()=>submit('#61b6d8')}/>
                        <CustomCircle colorCode='#f50707' onPress={()=>submit('#f50707')}/>
                        <CustomCircle colorCode='#095313' onPress={()=>submit('#095313')}/>
                        <CustomCircle colorCode='#eea60a' onPress={()=>submit('#eea60a')}/>
                    </View>
                    
                </View>
            </Modal>

            <Modal
                visible={modalReminderVisible}
                animationType='fade'
                transparent={true}
            >
                <View style={styles.modalReminderView}>
                    <View style={styles.reminderHead}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 60, margin: 10}}>Set Reminder</Text>
                    </View>
                    <View style={styles.reminderBody}>
                        <View style={{flexDirection: 'row'}}>
                            <Switch
                                trackColor={{ false: "#6915bd", true: "#020914" }}
                                thumbColor={reminderEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={reminderEnabled}
                            />
                            <Text style={{fontSize: 20}}>Enable</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={()=> {
                                    showDatePicker();
                                }}
                            >
                                <FontAwesome5 name='calendar' size={25} color='#a59f9f'/>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleDateConfirm}
                                    onCancel={hideDatePicker}
                                />
                            <Text>{date}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={()=> {
                                    showTimePicker();
                                }}
                            >
                                <FontAwesome5 name='clock' size={25} color='#a59f9f'/>
                                <DateTimePickerModal
                                    isVisible={isTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleTimeConfirm}
                                    onCancel={hideTimePicker}
                                />
                            </TouchableOpacity>
                            <Text>{time}</Text>
                            
                        </View>
                    </View>
                    
                </View>
            </Modal>
            


            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('App1')
                    }}
                    style={{marginLeft: 4}}
                >
                    <FontAwesome5  name='arrow-left' size={30} color='#010f0d' />
                </TouchableOpacity>
                <Text style={styles.title}>ColorNote</Text>
                <TouchableOpacity
                    style={{margin: 10}}
                    onPress={() => {
                        setModalColorVisible(true);
                    }}
                >
                    <FontAwesome5  name='circle' size={40} color='#3c3d3d' />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        
                    }}
                >
                   <FontAwesome5  name='ellipsis-v' size={30} color='#010f0d' />
                </TouchableOpacity>
            </View>
            
            <View style={styles.body}>
                <View style={styles.reminder}>
                    <TouchableOpacity
                        style={{margin: 10, flexDirection: 'row'}}
                        onPress={()=> {
                            setModalReminderVisible(!modalReminderVisible)
                        }}
                    >
                        <FontAwesome5 name='stopwatch' size={30} color ='#050505'/>
                        <Text style={{marginTop: 6, marginLeft: 5}}>Add Reminder</Text>
                    </TouchableOpacity>
                    
                </View>
                <View>
                    <TextInput
                        style={styles.addInputTitle}
                        placeholder='Title'
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines = {16}
                        placeholder='Note'
                        style={styles.textInput}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={()=> {
                        
                    }}
                    
                >
                    <FontAwesome5 name = 'undo' size={60} color='#130202'/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> {

                    }}
                    style={{marginRight: 90}}
                >
                    <FontAwesome5 name = 'redo-alt' size={60} color='#130202'/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> {

                    }}
                >
                    <FontAwesome5 name = 'save' size={60} color='#130202'/>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default TextScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center'
    },
    body: {
        flex: 1,
        width: windowWidth - 3,
        height: windowHeight - 200,
        backgroundColor: '#ffffffc5',
    },
    footer: {
        marginLeft: 100,
        marginTop: 20,
        flexDirection: 'row',
        
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 120,
        marginLeft: 20,
    },
    reminder: {
        marginLeft: 240,
    },
    addInputTitle: {
        fontSize: 25,
        margin: 5,
    },
    textInput: {
        textAlignVertical: 'top',
        fontSize: 25,
        margin: 5,
    },
    modalColorView: {
        margin: 20,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 100,
        width: 200,
        borderRadius: 8,
        marginTop: 75,
        marginLeft: 190,
    },
    modalReminderView: {
        margin: 20,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: windowHeight/3,
        width: 300,
        borderRadius: 8,
        alignSelf:'center',
        marginTop: windowHeight/3,
    },
    reminderHead: {
        backgroundColor: '#e4e70e'
    },
    reminderBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  
})
