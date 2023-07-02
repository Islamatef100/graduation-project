import 'dart:io';
import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/models/allTransactions.dart';
import 'package:dio/dio.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:carta/network/remote/dio_Helper.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../pages/AddVehicle/addvehicle.dart';
import '../pages/Contactus/contactScreen.dart';
import '../pages/Home/homeScreen.dart';
import '../pages/carsScreen/carsscreen.dart';
import '../pages/fine/finesScreen.dart';
import '../shared/constants/constants.dart';

class LayoutCubit extends Cubit<LayoutStates> {
  //initial Constructor.
  LayoutCubit() : super(LayoutInitialState());

  static LayoutCubit get(context) => BlocProvider.of(context);

  int currentIndex = 0;

  List<BottomNavigationBarItem> bottomItems = [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.money),
      label: 'Fines',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.car_crash_rounded),
      label: 'cars',
    ),
  ];

  List<Widget> screens = [
    HomeScreen(),
    FineScreen(),
    CarsScreen(),
  ];

  void changeBottomNavBar(index) {
    currentIndex = index;

    emit(CartaBottomNavState());
  }

  void uservehicle({
    required String vIdcontroller,
    required String licenceIdcontroller,
    required String vClasscontroller,
    required String trafficunitController,
    required String licenceCreatecontroller,
    required String licenceExpirecontroller,
    required String manufacController,
    required String modelController,
    required String manufacYearcontroller,
    required String colorController,
    required File image,
  }) {
    //emit(CartaLoginLoadingState());
    DioHelper.postData(
      url: 'http://192.168.1.9:4242/vehicles',
      data: {
        'vehicle_id': vIdcontroller,
        'license_id': licenceIdcontroller,
        'vehicle_class': vClasscontroller,
        'traffic_unit': trafficunitController,
        'license_create_date': licenceCreatecontroller,
        'license_expired_date': licenceExpirecontroller,
        'manufacturer': manufacController,
        'model': modelController,
        'manufacturering_year': manufacYearcontroller,
        'color': colorController,
        'image': image,
      },
    ).then((value) {
//      emit(CartaLoginSuccessState(cartaloginmodel));
    }).catchError((error) {
      print(error.toString());
      // emit(CartaLoginErrorState(error.toString()));
      print(error.toString());
    });
  }

  // late VehiclesModel vehiclesmodel;

  // void getvehicles() {
  //   DioHelper.getData(
  //     url: 'http://192.168.1.3:4242/vehicles',
  //     token: token,
  //   ).then((value) {
  //     vehiclesmodel = VehiclesModel.fromJson(value.data);
  //     emit(CartaSuccessAllvehicleState());
  //   }).catchError((error) {
  //     print(error.toString());
  //     emit(CartaErrorAllvehicleState(error));
  //   });
  // }

  // late TransactionsModel transactionsmodel;

  // void getTransactions() {
  //   DioHelper.getData(
  //     url: 'http://192.168.1.3:4242/transactions',
  //     token: token,
  //   ).then((value) {
  //     transactionsmodel = TransactionsModel.fromJson(value.data);
  //     emit(CartaSuccessAllTransactionsState());
  //   }).catchError((error) {
  //     print(error.toString());
  //     emit(CartaErrorAllTransactionsState(error));
  //   });
  // }
}
