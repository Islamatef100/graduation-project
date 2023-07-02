//import 'package:p/models/login_model.dart';

import '../../models/loginModel.dart';

abstract class CartaLoginStates {}

class CartaLoginInitialState extends CartaLoginStates {}

class CartaLoginLoadingState extends CartaLoginStates {}

class CartaLoginSuccessState extends CartaLoginStates {
  final CartaLoginModel cartaloginmodel;
  CartaLoginSuccessState(this.cartaloginmodel);
}

class CartaLoginErrorState extends CartaLoginStates {
  final String error;
  CartaLoginErrorState(this.error);
}

class CartaLoginPasswordState extends CartaLoginStates {}
