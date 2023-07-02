abstract class StolenStates {}

class StolenInitialState extends StolenStates {}

class StolenLoadingState extends StolenStates {}

class StolenSucccessState extends StolenStates {}

class StolenErrorState extends StolenStates {
  final String error;
  StolenErrorState(this.error);
}
