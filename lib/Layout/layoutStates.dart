import 'package:carta/models/allTransactions.dart';

abstract class LayoutStates {}

class LayoutInitialState extends LayoutStates {}

class CartaBottomNavState extends LayoutStates {}

class CartaLoadingState extends LayoutStates {}

class CartaGetFineSuccessState extends LayoutStates {}

class CartaGetFineErrorState extends LayoutStates {
  final String error;
  CartaGetFineErrorState(this.error);
}

class CartaLoadingUserDataState extends LayoutStates {}

class CartaSuccessUserDataState extends LayoutStates {}

class CartaErrorUserDataState extends LayoutStates {
  final String error;
  CartaErrorUserDataState(this.error);
}

class MyVehicleSuccess extends LayoutStates {}

class MyVehicleError extends LayoutStates {}

class CartaSuccessAllTransactionsState extends LayoutStates {}

class CartaErrorAllTransactionsState extends LayoutStates {
  final String error;
  CartaErrorAllTransactionsState(this.error);
}

class CartaSuccessCarState extends LayoutStates {}

class CartaLoadingCarState extends LayoutStates {}

class CartaErrorCarState extends LayoutStates {
  final String error;
  CartaErrorCarState(this.error);
}

class CartaSuccessAllvehicleState extends LayoutStates {}

class CartaErrorAllvehicleState extends LayoutStates {
  final String error;
  CartaErrorAllvehicleState(this.error);
}

class CartaCarImageSuccessState extends LayoutStates {}

class CartaCarImageErrorState extends LayoutStates {
  // final String error;
  // CartaCarImageErrorState(this.error);
}

class CartaProfileImageSuccessState extends LayoutStates {}

class CartaProfileImageErrorState extends LayoutStates {
  final String error;
  CartaProfileImageErrorState(this.error);
}
