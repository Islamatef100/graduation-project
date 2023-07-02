import 'package:carta/models/allTransactions.dart';
import 'package:carta/models/stolenCars.dart';
import 'package:carta/pages/fine/finesCubit/fineStates.dart';
import 'package:carta/pages/reports/stolenCubit/stolenStates.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../network/remote/dio_Helper.dart';
import '../../../shared/Components/components.dart';
import '../../../shared/constants/constants.dart';

class StolenCubit extends Cubit<StolenStates> {
  StolenCubit() : super(StolenInitialState());

  static StolenCubit get(context) => BlocProvider.of(context);

  late StolenVehiclesModel stolenmodel;

  void getStolenCars() {
    DioHelper.getData(
      url: 'http://192.168.1.3:4242/vehicles/$ssn/usersafecars',  //localhost:4242/vehicles/30012012300977/userstolencars
      // query: {'is_stolen': 'stolen'},
      token: token,
    ).then((value) {
      stolenmodel = StolenVehiclesModel.fromJson(value.data);
      emit(StolenSucccessState());
    }).catchError((error) {
      print(error.toString());
      emit(StolenErrorState(error));
    });
  }
}
