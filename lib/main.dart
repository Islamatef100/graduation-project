import 'dart:convert';

import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:carta/Login/cubit/login_states.dart';
import 'package:carta/Login/login.dart';
import 'package:carta/network/local/cache_helper.dart';
import 'package:carta/network/remote/dio_Helper.dart';
import 'package:carta/pages/carsScreen/carCubit/carcubit.dart';
import 'package:carta/pages/fine/finesCubit/fineCubit.dart';
import 'package:carta/pages/reports/stolenCubit/stolencubit.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:carta/shared/bloc_observer.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'Layout/layoutCubit.dart';
import 'Layout/layoutCubit.dart';
import 'Login/cubit/login_cubit.dart';

import 'dart:io';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  DioHelper.init();
  Bloc.observer = MyBlocObserver();
  await CacheHelper.init();
  //token = CacheHelper.getData(key: 'token');
  ssn = CacheHelper.getData(key: 'ssn');
  user_name = CacheHelper.getData(key: 'user_name');
  user_mail = CacheHelper.getData(key: 'user_mail');
  user_phone = CacheHelper.getData(key: 'user_phone');
  user_address = CacheHelper.getData(key: 'user_address');
  user_job = CacheHelper.getData(key: 'user_job');
  user_nationality = CacheHelper.getData(key: 'user_nationality');
  print(ssn);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    LayoutCubit get(context) => BlocProvider.of(context);

    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => LayoutCubit()
            // ..getTransactions(),
            ),
        BlocProvider(create: (context) => CartaLoginCubit()),
        BlocProvider(create: (context) => FineCubit()..getTransactions()),
        BlocProvider(create: (context) => StolenCubit()..getStolenCars()),
        BlocProvider(create: (context) => CarCubit()..getCars()),
      ],
      child: BlocConsumer<CartaLoginCubit, CartaLoginStates>(
        listener: (context, state) {},
        builder: (context, state) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            home: LoginScreen(),
          );
        },
      ),
    );
  }
}
