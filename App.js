import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";





export default function App() {
  
  const initialMinutes = 5;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const calculateProgress = () => {
    const totalSeconds = initialMinutes * 60;
    const remainingSeconds = minutes * 60 + seconds;
    const progress = remainingSeconds / totalSeconds;
    return progress;
  };

  const [progressBar, setProgressBar] = useState(calculateProgress());

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completo, reiniciar ou fazer outra ação
            setIsRunning(false);
            setMinutes(initialMinutes);
            setSeconds(0);
            setProgressBar(calculateProgress());
          } else {
            // Decrementar os minutos e resetar os segundos
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
            setProgressBar(calculateProgress());
            
          }
        } else {
          // Decrementar os segundos
          setSeconds((prevSeconds) => prevSeconds - 1);
          setProgressBar(calculateProgress());
        }

      }, 1); // Modificado o intervalo para 1000ms (1 segundo)
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setProgressBar(calculateProgress());
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animatable.View style={styles.header} animation={"fadeInDown"}>
        <LottieView style={styles.lottie} source={require('./src/assets/uni.json')} autoPlay loop={isRunning} />
        <Text style={styles.title}>Promôdoro</Text>
        <Text style={{ color: 'white', position: 'absolute', right: 10, top: 45 }}> 1#</Text>
      </Animatable.View>
      <Animatable.View style={[styles.body, { fontSize: 50 }]} delay={600} animation={"fadeInUp"}>
        <View style={{ flex: 1 / 4, width: '100%' }}>
          <View style={{ width: '100%', justifyContent: 'flex-end' }}>

            <View style={styles.boxIconTitle}>
              <FontAwesome5 name='brain' size={30} color={'#470A68'} />
              <Text style={{ fontSize: 20, color: '#470A68' }}>
                Foco
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.circuloText}>
          <Progress.Circle
            style={{ position: 'absolute' }}
            color='#470A68'
            borderColor='white'
            size={250}
            progress={progressBar}
            borderWidth={4}
          />
          <Text style={styles.textCirculo}>
            {`${formatTime(minutes)}:${formatTime(seconds)}`}
          </Text>
        </View>

      </Animatable.View>
      <View>
        <Animatable.View style={styles.menu} animation={'fadeInUp'} delay={1000}>

          {!isRunning ? (
            <TouchableOpacity onPress={startTimer}>
              <Ionicons name="play-circle-outline" color='#470A68' size={50} />
            </TouchableOpacity>

          ) : (

              <TouchableOpacity onPress={pauseTimer}>
                <Ionicons name="pause-circle-outline" color='#470A68' size={50} />
              </TouchableOpacity>

            )}

          <TouchableOpacity onPress={resetTimer}>
            <Ionicons name="stop-circle-outline" color='#470A68' size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={resetTimer}>
            <Ionicons name="play-forward-circle-outline" color='#470A68' size={50} />
          </TouchableOpacity>
        </Animatable.View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',

  },
  lottie: {
    width: 100,
    height: 100,
  },
  lottieBrain: {
    width: 80,
    height: 80,
  },
  textCirculo: {

    marginBottom: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#470A68',


  },
  header: {
    flex: 1 / 5,
    paddingTop: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#470A68',
    flexDirection: 'row',
    gap: 20,

  },
  boxIconTitle: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#470A68',
    alignSelf: 'center',
    marginRight: 15,
    gap: 15


  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,

  },
  circuloText: {
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',




  },

  menu: {


    flexDirection: 'row',
    gap: 15,
    marginTop: 50,
    width: '75%',

    backgroundColor: 'red',
    borderColor: '#470A68',
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    borderColor: '#470A68',
    marginBottom: 50




  },

  Button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 15,
    borderRadius: 30,
    paddingLeft: 5
  }
});
