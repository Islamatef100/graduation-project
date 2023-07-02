import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/models/allTransactions.dart';
import 'package:carta/pages/carsScreen/vDetail.dart';
import 'package:carta/pages/fine/finesCubit/fineCubit.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../network/remote/dio_Helper.dart';
import '../fine/finesCubit/fineStates.dart';
import 'carCubit/carStates.dart';
import 'carCubit/carcubit.dart';

class CarsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    VehiclesModel vmodel;
    //FineCubit.get(context).getTransactions();
    return BlocConsumer<CarCubit, CarStates>(
      listener: (context, state) {},
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: Text("Cars"),
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
                        CarCubit.get(context).getCars();
                      },
                      child: Text(
                        "Reload",
                      )),
                  SizedBox(
                    height: 10,
                  ),
                  if (state is CarLoadingState) LinearProgressIndicator(),
                  SizedBox(
                    height: 10,
                  ),
                  if (state is CarSucccessState)
                    Expanded(
                        child: ListView.separated(
                            itemBuilder: (context, index) => GestureDetector(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => VDetail(
                                                  vv: CarCubit.get(context)
                                                      .vehiclemodel
                                                      .vehicles[index],
                                                )));
                                  },
                                  child: buildVehicleItem(
                                      CarCubit.get(context)
                                          .vehiclemodel
                                          .vehicles[index],
                                      context),
                                ),
                            separatorBuilder: (context, index) => myDivider(),
                            itemCount: CarCubit.get(context)
                                .vehiclemodel
                                .vehicles
                                .length)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

Widget buildfine(Transactions model, context) => Padding(
      padding: EdgeInsets.all(20),
      child: Container(
        height: 18,
        child: Text(model.vehicle),
      ),
    );

Widget buildTrasactionsItem(Transactions ttmodel, context) => Padding(
      padding: const EdgeInsets.all(20.0),
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 5),
        padding: EdgeInsets.only(right: 10),
        height: 130,
        width: 350,
        decoration: BoxDecoration(
          color: Color(0xffF5D7DB),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(children: [
          Container(
            height: 100,
            width: 90,
            margin: EdgeInsets.only(left: 8),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Color(0xffd4ecf7),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Image.asset(
              "assets/car.png",
              height: 150,
              width: double.infinity,
            ),
          ),
          Container(
            child: Padding(
              padding: EdgeInsets.only(left: 15, top: 20, bottom: 25),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        ttmodel.transactionId.toString(),
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        "Location: ",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        ttmodel.place,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Text(
                        "Date: ",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        ttmodel.adjustmentDate,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Text(
                        "Time: ",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        ttmodel.adjustmentTime,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Spacer(),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                children: [
                  Text(
                    ttmodel.fine.toString(),
                    style: TextStyle(
                      color: Colors.teal,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    "\$",
                    style: TextStyle(
                      color: Colors.teal,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              // GestureDetector(
              //   child: Container(
              //     margin: EdgeInsets.only(left: 6),
              //     height: 50,
              //     width: 50,
              //     decoration: BoxDecoration(
              //       borderRadius: BorderRadius.circular(20),
              //       color: Color(0xffe8bcb9),
              //     ),
              //     child: Center(
              //       child: Text(
              //         "Pay",
              //         style: TextStyle(
              //           fontSize: 15,
              //           color: Colors.black,
              //           fontWeight: FontWeight.bold,
              //         ),
              //       ),
              //     ),
              //   ),
              // ),
            ],
          ),
        ]),
      ),
    );

Widget buildVehicleItem(Vehicles vmodel, context) => Padding(
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
              color: Colors.teal,
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
                          vmodel.license,
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
                              vmodel.licenseExpiredDate,
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
                              vmodel.manufacturer,
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
