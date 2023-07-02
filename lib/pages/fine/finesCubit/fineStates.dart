abstract class FinesStates {}

class FineInitialState extends FinesStates {}

class FinesLoadingState extends FinesStates {}

class FinesSucccessState extends FinesStates {}

class FinesErrorState extends FinesStates {
  final String error;
  FinesErrorState(this.error);
}
