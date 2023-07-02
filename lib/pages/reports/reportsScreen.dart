import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/models/allTransactions.dart';
import 'package:carta/models/stolenCars.dart';
import 'package:carta/pages/carsScreen/vDetail.dart';
import 'package:carta/pages/fine/finesCubit/fineCubit.dart';
import 'package:carta/pages/reports/stolenCubit/stolenStates.dart';
import 'package:carta/pages/reports/stolenCubit/stolencubit.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../network/remote/dio_Helper.dart';

class StolenScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    StolenVehiclesModel stolenmodel;
    //FineCubit.get(context).getTransactions();
    return BlocConsumer<StolenCubit, StolenStates>(
      listener: (context, state) {},
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: Text(
              "Stolen Cars",
            ),
            elevation: 0,
            flexibleSpace: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.teal,
                    Color.fromARGB(255, 6, 127, 174),
                  ],
                ),
              ),
            ),
          ),
          body: SafeArea(
            child: Center(
              child: Column(
                children: [
                  SizedBox(
                    height: 30,
                  ),
                  ElevatedButton(
                      onPressed: () {
                        StolenCubit.get(context).getStolenCars();
                      },
                      child: Text(
                        "Reload",
                      )),
                  SizedBox(
                    height: 10,
                  ),
                  if (state is StolenLoadingState) LinearProgressIndicator(),
                  SizedBox(
                    height: 10,
                  ),
                  if (state is StolenSucccessState)
                    Expanded(
                        child: ListView.separated(
                      itemBuilder: (context, index) => GestureDetector(
                        onTap: () {
                          // Navigator.push(
                          //     context,
                          //     MaterialPageRoute(
                          //         builder: (context) => tDetail(
                          //               tt: FineCubit.get(context)
                          //                   .finemodel
                          //                   .transactions[index],
                          //             )));
                        },
                        child: buildStolenVehicle(
                            StolenCubit.get(context)
                                .stolenmodel
                                .vehicles[index],
                            context),
                      ),
                      separatorBuilder: (context, index) => myDivider(),
                      itemCount:
                          StolenCubit.get(context).stolenmodel.vehicles.length,
                    )),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

Widget buildStolenVehicle(SVehicles svmodel, context) => Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          SizedBox(
            height: 50,
          ),
          Container(
            padding: EdgeInsets.all(20),
            height: 210,
            width: 380,
            decoration: BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "CAR OWNER ",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.amber,
                          ),
                        ),
                        Text(
                          '$user_name',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 20),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(
                          width: 40,
                        ),
                        Text(
                          svmodel.license,
                          style: TextStyle(
                              fontSize: 25,
                              color: Colors.white,
                              fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Expire Data",
                              style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.amber,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text(
                              svmodel.licenseExpiredDate,
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(
                          width: 30,
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Model",
                              style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.amber,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text(
                              svmodel.manufacturer,
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        SizedBox(
                          width: 30,
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Status",
                              style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.amber,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text(
                              svmodel.isStolen,
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
