import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet, Picker} from 'react-native';
import DatePicker from 'react-native-datepicker';
import SplashScreen from 'react-native-splash-screen';

const StudentData = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const [name, setName] = useState('');
  const [date, setDate] = useState('10-10-2020');
  const [dropdownValue, setDropdownValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.formText}>
        <Text style={{fontSize: 30}}> STUDENT FORM </Text>
      </View>
      <View style={styles.formData}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.nameField}
          placeholder="Type your name!"
          onChangeText={(text) => setName(text)}
          defaultValue={name}
        />
        <Text style={styles.label}>Date Of Birth</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1980"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
        <Text style={styles.label}>Qualification</Text>
        <View style={styles.qualificationDropdown}>
          <Picker
            selectedValue={dropdownValue}
            // style={styles.qualificationDropdown}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>
              setDropdownValue(itemValue)
            }>
            <Picker.Item
              label="Select your highest qualification"
              value="Select your highest qualification"
            />
            <Picker.Item label="M.Tech" value="M.Tech" />
            <Picker.Item label="B.Tech" value="B.Tech" />
            <Picker.Item label="Higher Secondary" value="Higher Secondary" />
            <Picker.Item label="Secondary" value="Secondary" />
          </Picker>
        </View>
      </View>
    </View>
  );
};
export default StudentData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formText: {
    flex: 0.08,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    paddingTop: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    paddingTop: 10,
    paddingBottom: 10,
  },
  formData: {
    padding: 40,
    flex: 0.92,
  },
  nameField: {
    height: 50,
    width: 300,
    fontSize: 25,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  datePickerStyle: {
    width: 300,
  },
  qualificationDropdown: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
