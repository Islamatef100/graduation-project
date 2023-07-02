import 'package:carta/models/allTransactions.dart';
import 'package:carta/pages/fine/finesCubit/fineStates.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../network/remote/dio_Helper.dart';
import '../../../shared/Components/components.dart';

class FineCubit extends Cubit<FinesStates> {
  FineCubit() : super(FineInitialState());

  static FineCubit get(context) => BlocProvider.of(context);

  late TransactionsModel finemodel;

  void getTransactions() {
    DioHelper.getData(
      url: 'http://192.168.1.3:4242/transactions/$ssn/user/notpaid',
      token: token,
    ).then((value) {
      finemodel = TransactionsModel.fromJson(value.data);
      emit(FinesSucccessState());
    }).catchError((error) {
      print(error.toString());
      emit(FinesErrorState(error));
    });
  }
}
