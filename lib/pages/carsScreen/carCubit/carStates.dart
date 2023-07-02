abstract class CarStates {}

class CarInitialState extends CarStates {}

class CarLoadingState extends CarStates {}

class CarSucccessState extends CarStates {}

class CarErrorState extends CarStates {
  final String error;
  CarErrorState(this.error);
}
