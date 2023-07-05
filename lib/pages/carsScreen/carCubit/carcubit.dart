import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/models/allTransactions.dart';
import 'package:carta/pages/carsScreen/carCubit/carStates.dart';
import 'package:carta/pages/fine/finesCubit/fineStates.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../network/remote/dio_Helper.dart';
import '../../../shared/Components/components.dart';
import '../../../shared/constants/constants.dart';

class CarCubit extends Cubit<CarStates> {
  CarCubit() : super(CarInitialState());
  static CarCubit get(context) => BlocProvider.of(context);
  late VehiclesModel vehiclemodel;
  void getCars() {
    DioHelper.getData(
      url: 'http://10.0.2.2:4242/vehicles/$ssn',
      token: token,
    ).then((value) {
      vehiclemodel = VehiclesModel.fromJson(value.data);
      emit(CarSucccessState());
    }).catchError((error) {
      print(error.toString());
      emit(CarErrorState(error));
    });
  }
}
