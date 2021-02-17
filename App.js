import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MineField from './src/components/MineField';
import params from './src/params';
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines } from './src/functions';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if(lost){
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Tente novamente')
    }
    if(won){
      Alert.alert('Parabéns', 'Voce vendeu !')
    }
    this.setState({board, lost, won})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!!!</Text>
        <Text style={styles.instructions}>Tamanho da grade:
          {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField}/>
        </View>
        {/* 
        <Field/>
        <Field opened/>
        <Field opened nearMines={1}/>
        <Field opened nearMines={2}/>
        <Field opened nearMines={4}/>
        <Field mined/>
        <Field mined opened/>
        <Field mined opened exploded/>
        <Field flagged/>
        <Field flagged opened/> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});